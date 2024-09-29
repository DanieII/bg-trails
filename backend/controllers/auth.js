import User from "../models/User.js";
import { generateJWT } from "../utils/jwt.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  const users = await User.find();
  res.send({ users });
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already used" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({ firstName, lastName, email, password: hashedPassword });
  await user.save();

  const token = generateJWT(user);

  res.status(201).json({ token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  const token = generateJWT(user);

  res.status(201).json({ token });
};

export { registerUser, loginUser, getUsers };
