import express from "express";
import {
  getTrails,
  getClosestTrails,
  getLocations,
  getTrailDetails,
  createComment,
  getComments,
  likeTrail,
} from "../controllers/trailController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getTrails);
router.get("/closest", getClosestTrails);
router.get("/locations", getLocations);
router.get("/:id", getTrailDetails);
router.post("/:id/comments", authenticateUser, createComment);
router.get("/:id/comments", getComments);
router.post("/:id/like", authenticateUser, likeTrail);

export default router;
