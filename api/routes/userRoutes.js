import express from "express";
import {
  registerNewUser,
  loginUser,
  loginUserInfo,
  getAllUserInfo,
  logoutUser,
  getUserInfo,
} from "../controllers/userController.js";
import { isUserAuthincated } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.get("/logout", isUserAuthincated, logoutUser);
router.get("/info", isUserAuthincated, loginUserInfo);
router.get("/getAllUsers", isUserAuthincated, getAllUserInfo);
router.get("/getUserInfo/:userid", isUserAuthincated, getUserInfo);

export default router;
