import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Not authorized, no token", success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ message: "Not authorized, token failed", success: false });

    const user = await User.findById(decoded.userId);
    if (!user)
      return res
        .status(401)
        .json({ message: "Not authorized, user not found", success: false });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, token failed", success: false });
  }
};

export default protect;
