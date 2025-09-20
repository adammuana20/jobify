import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

import { FormRow, Logo, SubmitBtn } from "../components";

import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { User } from "../types/User";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post<User>("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login Successful");

      return redirect("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };

    try {
      await customFetch.post<User>("/auth/login", data);
      toast.success("Take a test drive");

      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
