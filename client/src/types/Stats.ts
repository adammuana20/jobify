export type Stats = {
  declined: number;
  interview: number;
  pending: number;
};

export type MonthlyApplications = {
  date: string;
  count: number;
};

export type StatsResponse = {
  defaultStats: Stats;
  monthlyApplications: MonthlyApplications[];
};
