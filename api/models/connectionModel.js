import mongoose from "mongoose";

const connectionSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const ConnectionSchema = mongoose.model("Connections", connectionSchema);
