import express from "express";
import {
  getTrails,
  getLocations,
  getTrailDetails,
  createComment,
  getComments,
} from "../controllers/trailController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getTrails);
router.get("/locations", getLocations);
router.get("/:id", getTrailDetails);
router.post("/:id/comments", authenticateUser, createComment);
router.get("/:id/comments", getComments);

export default router;
