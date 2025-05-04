import mongoose from "mongoose";

import { ROLE } from "../utils/constants.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "my city",
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    avatar: {
      type: String,
    },
    avatarPublicId: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
