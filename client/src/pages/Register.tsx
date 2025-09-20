import { Form, redirect, Link, ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";

import { FormRow, Logo, SubmitBtn } from "../components";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { isAxiosError } from "axios";

type RegisterResponse = {
  msg: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post<RegisterResponse>("/auth/register", data);
    toast.success("Registration Successful!");

    return redirect("/login");
  } catch (error) {
    if (isAxiosError(error)) toast.error(error?.response?.data?.msg);

    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="doe"
        />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
