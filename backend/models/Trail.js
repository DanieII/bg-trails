import mongoose from "mongoose";
const { Schema } = mongoose;

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
});

const Trail = mongoose.model("Trail", trailSchema);

export default Trail;
