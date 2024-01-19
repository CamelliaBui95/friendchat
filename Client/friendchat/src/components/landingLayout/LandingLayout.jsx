import React from "react";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
      <div className="container">
          hello
      <Outlet />
    </div>
  );
};

export default LandingLayout;
