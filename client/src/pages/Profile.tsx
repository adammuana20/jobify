import { toast } from "react-toastify";
import {
  ActionFunctionArgs,
  redirect,
  useOutletContext,
} from "react-router-dom";
import { Form } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { FormRow, SubmitBtn } from "../components";

import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { User } from "../types/User";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const file = formData.get("avatar");

    if (file instanceof File && file.size > 500000) {
      toast.error("Image size too large!");
      return null;
    }

    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile update successfully!");
      return redirect("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.msg);
    }

    return null;
  };

const Profile = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
