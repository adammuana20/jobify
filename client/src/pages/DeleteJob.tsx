import { toast } from "react-toastify";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { isAxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

import customFetch from "../utils/customFetch";

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      const { id } = params;
      if (!id) throw new Error("No job id provided");

      await customFetch.delete(`/jobs/${id}`);
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job Deleted!");
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
