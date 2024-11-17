import express from "express";
import { getTrails, getLocations } from "../controllers/trailController.js";

const router = express.Router();

router.get("/", getTrails);
router.get("/locations", getLocations);

export default router;
