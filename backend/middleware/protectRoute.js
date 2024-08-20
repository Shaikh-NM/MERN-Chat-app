import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import User from "../models/user.model.js";

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res
        .staus(400)
        .json({ success: false, error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect route : ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export default protectRoute;
