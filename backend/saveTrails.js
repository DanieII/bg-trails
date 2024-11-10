import osmtogeojson from "osmtogeojson";
import { length } from "@turf/length";
import Trail from "./models/Trail.js";
import mongoose from "mongoose";

const getOSMTrailsData = async () => {
  // Getting trails in Sofia
  const query = `[out:json][timeout:25];
                // fetch area “Sofia” to search in
                area(id:3604283101)->.searchArea;
                // gather results
                nwr["route"="hiking"]["network"!="iwn"]["network"!="nwn"](area.searchArea);
                // print results
                out geom;`;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: "data=" + encodeURIComponent(query),
  });
  const osmData = await response.json();
  const osmDataAsGeoJson = osmtogeojson(osmData);

  return osmDataAsGeoJson;
};

const getTrailStartingCoordinates = (geometry) => {
  if (geometry.type === "MultiLineString") {
    return geometry.coordinates[0][0];
  }

  return geometry.coordinates[0];
};

const getTrailLocation = async (geometry) => {
  const [lon, lat] = getTrailStartingCoordinates(geometry);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse.php?format=json&lat=${lat}&lon=${lon}&zoom=5`,
  );
  const data = await response.json();

  return data.name;
};

const getTrailName = (properties) => {
  if (properties.name) return properties.name;

  return `${properties.name.from} - ${properties.name.to}`;
};

const validateTrailData = (data) => {
  const allowedGeometryTypes = Trail.schema.path("geometry.type").enumValues;

  if (!data.properties.name && !(data.properties.from && data.properties.to))
    return false;
  if (!allowedGeometryTypes.includes(data.geometry.type)) return false;

  return true;
};

const saveTrailsData = async () => {
  console.log("Connecting to database...");
  await mongoose.connect("mongodb://localhost:27017/bg-trail", {});

  console.log("Fetching data from OpenStreetMap...");
  const data = await getOSMTrailsData();

  console.log("Processing trails data...");
  const trailsToSave = [];
  // No Promise.all() because of nominatim api request limit
  for (const trailData of data.features) {
    if (!validateTrailData(trailData)) continue;

    try {
      const trailName = getTrailName(trailData.properties);
      const trailLocation = await getTrailLocation(trailData.geometry);
      const trailLength = Math.ceil(
        length(trailData.geometry, { units: "kilometers" }),
      );

      trailsToSave.push({
        name: trailName,
        location: trailLocation,
        length: trailLength,
        geometry: trailData.geometry,
      });
    } catch (error) {
      console.error("Failed to process trail data:", error);
    }
  }

  console.log("Saving trails...");
  try {
    await Trail.insertMany(trailsToSave);
    console.log("Trails saved successfully");
  } catch (error) {
    console.error("Failed to save trails:", error);
  }

  mongoose.disconnect();
};

saveTrailsData();
