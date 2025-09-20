import { toast } from "react-toastify";
import { ActionFunctionArgs, useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { FormRow, FormRowSelect, SubmitBtn } from "../components";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { User } from "../types/User";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/jobs", data);

      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job Created!");
      return redirect("all-jobs");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error("Unexpected error occurred");
      }
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext<{ user: User }>();
  const jobStatusList = Object.values(JOB_STATUS) as Array<
    (typeof JOB_STATUS)[keyof typeof JOB_STATUS]
  >;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={jobStatusList}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
