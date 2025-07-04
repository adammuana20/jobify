import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res, next) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // SETUP PAGINATION

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    totalJobs,
    numOfPages,
    currentPage: page,
    jobs,
  });
};

export const createJob = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    msg: "Job created!",
    job,
  });
};

export const getJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({
    job,
  });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({
    msg: "job updated",
    updatedJob,
  });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({
    msg: "job deleted",
  });
};

export const showStats = async (req, res, next) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, currVal) => {
    const { _id: title, count } = currVal;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  // let monthlyApplications = [
  //   {
  //     date: "May 2",
  //     count: 12,
  //   },
  //   {
  //     date: "Jun 2",
  //     count: 9,
  //   },
  //   {
  //     date: "Jul 2",
  //     count: 6,
  //   },
  //   {
  //     date: "Aug 2",
  //     count: 15,
  //   },
  //   {
  //     date: "Sep 2",
  //     count: 18,
  //   },
  // ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
