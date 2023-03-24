import * as React from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

function SidebarNavLink({ to, children }) {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={clsx("sidebar-navlink", {
        active: location.pathname === to,
      })}
    >
      {children}
    </Link>
  );
}

export default SidebarNavLink;
