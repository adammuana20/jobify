import { NavLink } from "react-router-dom";

import { useDashboardContext } from "../pages/DashboardLayout";

import links from "../utils/links";

type NavLinksProps = {
  isBigSidebar?: boolean;
};

const NavLinks = ({ isBigSidebar }: NavLinksProps) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;

        if (path === "admin" && user?.role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? () => {} : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
