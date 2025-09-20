import { ReactNode } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

type JobInfoProps = {
  icon: ReactNode;
  text: string;
};

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
