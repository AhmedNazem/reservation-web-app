import jwt from "jsonwebtoken";
import { appError } from "./appError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt_token; // Extract the token from cookies
  if (!token) {
    return next(appError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(appError(403, "Token is not valid"));
    req.user = user; // Attach the user to the request
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // User is authorized
    } else {
      return next(appError(403, "You are not authorized"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next(); // User is authorized
    } else {
      return next(appError(403, "You are not authorized"));
    }
  });
};
