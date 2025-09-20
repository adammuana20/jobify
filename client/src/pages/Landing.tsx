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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus nisi
            eos saepe assumenda nulla fugit facilis ullam tempora rerum, eius
            dicta quia aliquam mollitia a voluptates. Eum quod iusto modi.
            Mollitia magnam provident et perspiciatis minima voluptas rerum?
            Delectus, necessitatibus repudiandae illum, corrupti, aspernatur non
            vel consectetur vitae magni ipsam veritatis repellat nobis animi?
            Quaerat nesciunt dolore rerum sapiente nemo.
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
