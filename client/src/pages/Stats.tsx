import { QueryClient, useQuery } from "@tanstack/react-query";

import { ChartsContainer, Loading, StatsContainer } from "../components";

import customFetch from "../utils/customFetch";
import { StatsResponse } from "../types/Stats";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get<StatsResponse>("/jobs/stats");

    return response.data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData(statsQuery);
};

const Stats = () => {
  const { data, isLoading } = useQuery(statsQuery);

  if (isLoading) return <Loading />;
  if (!data) return <p>No stats found</p>;

  const defaultStats = data?.defaultStats;
  const monthlyApplications = data?.monthlyApplications;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
