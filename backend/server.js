import express from "express";
import cors from "cors";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import trailRoutes from "./routes/trailRoutes.js";

// Database connection
connectToDB();

// Initialize express
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/auth", authRoutes);
app.use("/trails", trailRoutes);
