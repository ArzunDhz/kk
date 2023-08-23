import jwt from "jsonwebtoken";

export const sendCookie = (res, user, message, statuscode = 200) => {
  const token = jwt.sign({ userDetails: user }, process.env.JWT_SECRET);

  res
    .cookie("token", token, {
      maxAge: new Date(Date.now() + 1000),
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    })
    .status(statuscode)
    .json({
      success: true,
      message: message,
      user,
    });
};
