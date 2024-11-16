import express from "express";
import { getTrails } from "../controllers/trailController.js";

const router = express.Router();

router.get("/", getTrails);

export default router;
