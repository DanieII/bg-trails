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

    const trails = await Trail.find(filter).skip(skip).limit(limit);

    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClosestTrails = async (req, res) => {
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
  ]);

  res.status(200).json(closestTrails);
};

const getTrailDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Trail not found" });
    }

    const trail = await Trail.findById(id);

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
        select: "firstName lastName",
      },
    });

    res.status(200).json(trail.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//const likeTrail = async (req, res) => {
//  try {
//    const { id } = req.params;
//    const userId = req.userId;
//
//    if (!isValidObjectId(id)) {
//      return res.status(400).json({ message: "Trail not found" });
//    }
//
//    const trail = await Trail.findById(id);
//
//    if (trail.likes.includes(userId)) {
//      return res
//        .status(400)
//        .json({ message: "User has already liked the trail" });
//    }
//
//    trail.likes.push(userId);
//    await trail.save();
//
//    res.status(200).json({ message: "Trail liked", id });
//  } catch (error) {
//    res.status(500).json({ message: error.message });
//  }
//};
//
//const unlikeTrail = async (req, res) => {
//  try {
//    const { id } = req.params;
//    const userId = req.userId;
//
//    if (!isValidObjectId(id)) {
//      return res.status(400).json({ message: "Trail not found" });
//    }
//
//    const trail = await Trail.findById(id);
//
//    if (!trail.likes.includes(userId)) {
//      return res.status(400).json({ message: "User has not liked the trail" });
//    }
//
//    // No idea if this works
//    trail.likes = trail.likes.filter((likeUserId) => likeUserId !== userId);
//
//    return res.status(200).json({ message: "Trail unliked", id });
//  } catch (error) {
//    res.status(500).json({ message: error.message });
//  }
//};

export {
  getTrails,
  getClosestTrails,
  getTrailDetails,
  getLocations,
  createComment,
  getComments,
};
