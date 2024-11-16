import Trail from "../models/trailModel.js";

const getTrails = async (req, res) => {
  try {
    const trails = await Trail.find({});

    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trails.", error });
  }
};

export { getTrails };
