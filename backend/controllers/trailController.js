import Trail from "../models/trailModel.js";
import mongoose from "mongoose";

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

const getTrailDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let trail;

    try {
      trail = await Trail.findById(id);
    } catch (error) {
      res.status(404).json({ message: "Trail not found" });
    }

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
    const trail = await Trail.findById(id);

    if (!trail) {
      res.status(404).json({ message: "Trail not found" });
    }

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
    let comments;

    try {
      const trail = await Trail.findById(id);
      comments = trail.get("comments");
    } catch (error) {
      res.status(404).json({ message: "Trail not found" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTrails, getTrailDetails, getLocations, createComment, getComments };
