import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      await queryClient.invalidateQueries(["jobs"]);
      toast.success("Job Deleted!");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
