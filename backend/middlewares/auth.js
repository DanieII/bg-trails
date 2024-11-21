import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.id;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { authenticateUser };
