import Trail from "../models/trailModel.js";
import { isValidObjectId } from "mongoose";

const getTrails = async (req, res) => {
  try {
    const { page, limit, location, search } = req.query;
    const skip = page * limit;
    const filter = {};

    if (location) {
      filter.location = location;
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const trails = await Trail.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-comments");

    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClosestTrails = async (req, res) => {
  try {
    let { lat, lon } = req.query;
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    const closestTrails = await Trail.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lat, lon] },
          distanceField: "dist.calculated",
          maxDistance: 5000,
          spherical: true,
        },
      },
      {
        $project: {
          comments: 0,
        },
      },
    ]);

    res.status(200).json(closestTrails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrailDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Trail not found" });
    }

    const trail = await Trail.findById(id).select("-comments");

    res.status(200).json(trail);
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

const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Trail not found" });
    }

    const trail = await Trail.findById(id);
    const comment = { text, user: userId };
    trail.comments.push(comment);
    await trail.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Trail not found" });
    }

    const trail = await Trail.findById(id).populate({
      path: "comments",
      populate: {
        path: "user",
        select: ["firstName", "lastName"],
      },
    });

    res.status(200).json(trail.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeTrail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Trail not found" });
    }

    const trail = await Trail.findById(id);
    const isLiked = trail.likes.includes(userId);

    if (isLiked) {
      trail.likes.pull(userId);
    } else {
      trail.likes.push(userId);
    }

    await trail.save();
    res.status(200).json({ message: "Trail updated successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMostLikedTrails = async (req, res) => {
  try {
    const trailsSortedByLikes = await Trail.find()
      .sort({ likes: -1 })
      .limit(5)
      .select("-comments");

    return res.status(200).json(trailsSortedByLikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getTrails,
  getClosestTrails,
  getTrailDetails,
  getLocations,
  createComment,
  getComments,
  likeTrail,
  getMostLikedTrails,
};
