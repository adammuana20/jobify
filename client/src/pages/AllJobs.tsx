import { useContext, createContext } from "react";
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsContainer, SearchContainer } from "../components";

import customFetch from "../utils/customFetch";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { JobResponse } from "../types/Job";

type AllJobsParams = {
  [k: string]: string;
};

type LoaderData = {
  searchValues: AllJobsParams;
};

type AllJobsContextProps = {
  data: JobResponse | undefined;
  searchValues: AllJobsParams;
};

const allJobsQuery = (params: AllJobsParams) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async (): Promise<JobResponse> => {
      const { data } = await customFetch.get<JobResponse>("/jobs", {
        params,
      });

      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      await queryClient.ensureQueryData(allJobsQuery(params));
      return { searchValues: { ...params } };
    } catch (error) {
      if (isAxiosError(error)) return toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AllJobsContext = createContext<AllJobsContextProps>({
  data: undefined,
  searchValues: {},
});

const AllJobs = () => {
  const { searchValues } = useLoaderData<LoaderData>();
  const { data } = useQuery<JobResponse>(allJobsQuery(searchValues));

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
