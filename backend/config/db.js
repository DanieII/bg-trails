import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://bg-trail-db/bg-trail", {});
  } catch (error) {
    console.error("Couldn't connect to database:", error);
  }
};

export default connectToDB;
