import jwt from "jsonwebtoken";
import ErrorHandler from "./Error.js";

export const isUserAuthincated = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Unauthorized Access", 403));
    const { userDetails } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();
  } catch (error) {}
};
