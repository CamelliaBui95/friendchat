import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";

const LandingLayout = () => {
    return (
      <main className="w-screen h-screen bg-bgLanding bg-no-repeat bg-cover bg-center">
        <NavBar
          navItems={[
            { label: "About", path: "/" },
            { label: "Log In", path: "/login" },
            { label: "Sign Up", path: "/register" },
          ]}
        />
        <div className="sm:px-[9rem] h-screen">
          <Outlet />
        </div>
      </main>
    );
};

export default LandingLayout;
