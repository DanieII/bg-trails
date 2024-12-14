import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const trailSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  length: { type: Number, required: true },
  geometry: {
    type: {
      type: String,
      enum: ["LineString", "MultiLineString"],
      required: true,
    },
    coordinates: { type: Array, required: true },
  },
  comments: [commentSchema],
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

trailSchema.index({ geometry: "2dsphere" });

const Trail = mongoose.model("Trail", trailSchema);

export default Trail;
