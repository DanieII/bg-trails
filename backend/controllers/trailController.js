import Trail from "../models/trailModel.js";

const getTrails = async (req, res) => {
  try {
    const { page, limit, location } = req.query;
    const skip = page * limit;
    const filter = location ? { location } : {};

    const trails = await Trail.find(filter).skip(skip).limit(limit);
    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Trail.distinct("location");

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTrails, getLocations };
