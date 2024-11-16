import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import Trail from "./Trail";

interface Trail {
  _id: string;
  name: string;
  location: string;
  length: number;
  geometry: GeoJSON.GeometryObject;
}

export default function Explore() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await axiosInstance.get("/trails");
        setTrails(response.data);
      } catch (error) {
        setError("Failed to fetch trails.");
      }
    };

    fetchTrails();
  }, []);

  return (
    <section>
      <div className="container">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Explore hiking trails in Bulgaria
        </h1>
        <div className="mt-4">
          {error ? (
            <p>{error}</p>
          ) : (
            <div className="flex gap-6 flex-wrap">
              {trails.map((trail) => (
                <Trail
                  key={trail._id}
                  _id={trail._id}
                  name={trail.name}
                  location={trail.location}
                  length={trail.length}
                  geometry={trail.geometry}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
