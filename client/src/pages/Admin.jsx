import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLoaderData, redirect } from "react-router-dom";

import { StatItem } from "../components";

import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/StatsContainer";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");

    return data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
