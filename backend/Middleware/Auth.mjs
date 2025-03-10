import jwt from "jsonwebtoken";
import { userCollection } from "../Models/userModel.mjs";


export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("🛡️ Decoded Token Data:", decoded); // Debugging

      req.user = await userCollection.findById(decoded.id).select("-password");

      console.log("👤 User Role Checking in Middleware:", req.user?.role); // Debugging

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Access denied. Admins only" });
};

export const coordinatorOnly = (req, res, next) => {
  console.log("🚦 Checking Coordinator Access: User Role ->", req.user?.role); // Debugging

  if (["admin", "coordinator"].includes(req.user?.role)) {
    return next();
  }
  
  return res.status(403).json({ message: "Access denied. Coordinators only" });
};

// Role-based authorization middleware
export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};