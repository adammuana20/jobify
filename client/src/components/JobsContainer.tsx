import Job from "./Job";

import { useAllJobsContext } from "../pages/AllJobs";

import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { data } = useAllJobsContext();

  if (!data) {
    return (
      <Wrapper>
        <h2>Loading or no jobs...</h2>
      </Wrapper>
    );
  }

  const { jobs, totalJobs, numOfPages, currentPage } = data;

  if (!jobs || jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer numOfPages={numOfPages} currentPage={currentPage} />
      )}
    </Wrapper>
  );
};
export default JobsContainer;
