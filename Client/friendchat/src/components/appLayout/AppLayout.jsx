import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const AppLayout = () => {
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState([]);
  const { handleLogOut } = useStoreActions((actions) => actions);

  const navItemsForProfile = [];

  return (
    <main className="h-screen w-screen bg-bgGradient">
      <NavBar navItems={navItems} />
      <div className="flex flex-row justify-center items-center h-full w-full pt-5">
        <Outlet context={[navItems, setNavItems]} />
      </div>
    </main>
  );
};

export default AppLayout;
