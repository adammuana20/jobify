type JobStatus = "pending" | "interview" | "declined";
type JobType = "full-time" | "part-time" | "internship";

export type Job = {
  readonly _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: JobType;
  jobStatus: JobStatus;
  createdAt: string;
  createdBy: string;
};

export type JobResponse = {
  currentPage: number;
  numOfPages: number;
  totalJobs: number;
  jobs: Job[];
};

export type UpdateJobPayload = Partial<
  Pick<Job, "position" | "company" | "jobLocation" | "jobStatus" | "jobType">
>;
