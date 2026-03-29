import { Link } from "react-router-dom";

import Logo from "../components/Logo";

import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
A fullstack job tracking app built with the MERN stack, featuring CRUD operations, search and filtering, and a dashboard for tracking application status. Includes user profile management with image uploads via Cloudinary. Built with React, Node.js, Express, and MongoDB following RESTful architecture.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
