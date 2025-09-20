import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  if (import.meta.env.NODE_ENV === "development") {
    console.error(error);
  }

  return <h4>There was an error...</h4>;
};
export default ErrorElement;
