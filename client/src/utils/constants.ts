export const JOB_STATUS = {
  PENDING: "pending",
  INTERVIEW: "interview",
  DECLINED: "declined",
} as const;

export const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERNSHIP: "internship",
} as const;

export const JOB_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
} as const;

export const ROLE = {
  USER: "user",
  ADMIN: "admin",
} as const;
