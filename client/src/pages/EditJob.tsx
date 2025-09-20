import { toast } from "react-toastify";
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { isAxiosError } from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { FormRow, FormRowSelect, Loading, SubmitBtn } from "../components";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Job, UpdateJobPayload } from "../types/Job";

const singleJobQuery = (id: string) => {
  return {
    queryKey: ["job", id],
    queryFn: async (): Promise<Job> => {
      const { data } = await customFetch.get(`/jobs/${id}`);

      return data.job;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      const { id } = params;

      if (!id) throw new Error("No job id provided");

      await queryClient.ensureQueryData<Job>(singleJobQuery(id));
      return params.id;
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch<UpdateJobPayload>(`/jobs/${params.id}`, data);

      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job Updated Successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { data: job, isLoading } = useQuery<Job>(singleJobQuery(id));

  if (isLoading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job!.position} />
          <FormRow type="text" name="company" defaultValue={job!.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job!.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job!.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job!.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
