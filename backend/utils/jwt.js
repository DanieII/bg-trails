import "dotenv/config";
import jwt from "jsonwebtoken";

const generateJWT = (user) => {
  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  return token;
};

export { generateJWT };
