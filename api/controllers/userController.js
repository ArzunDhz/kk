import ErrorHandler from "../middleware/Error.js";
import { UserSchema } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookies.js";

export const registerNewUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let newUser = await UserSchema.findOne({ email });
    if (newUser) return next(new ErrorHandler("User Already Exist", 409));

    const hashedPassword = bcrypt.hashSync(password, 10);

    newUser = UserSchema.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registered",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) return next(new ErrorHandler("User not Registered", 404));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Incorrect Password", 401));

    sendCookie(res, user, "Logged in", 200);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserInfo = async (req, res, next) => {
  try {
    const data = req.user;
    res.json({
      message: "Fetched User Information",
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllUserInfo = async (req, res, next) => {
  try {
    const user = await UserSchema.find({ _id: { $ne: req.user._id } });
    res.send(user);
  } catch (error) {
    next(error);
  }
};
export const getAllUserName = async (req, res, next) => {
  const serachQuery = req.query.search;
  if (!serachQuery) return res.json([]);
  try {
    const regex = new RegExp(serachQuery, "i");
    const users = await UserSchema.find({ username: regex }).select("username");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await UserSchema.findById(userid);
    if (!user) return next(new ErrorHandler("Usernot Found", 404));
    res.send(user);
  } catch (error) {
    next(error);
  }
};
