import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No auth token" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = verified.id;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { authenticateUser };
