import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already used!"],
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
