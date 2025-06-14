import mongoose from "mongoose";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
