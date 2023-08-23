import mongoose from "mongoose";

export const ConnectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "ChatApp" })
    .then(console.log("Data Base Connected"))
    .catch((err) => console.log(err));
};
