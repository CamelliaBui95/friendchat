import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import UserService from "../../services/userServices";

const AppLayout = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [navItems, setNavItems] = useState([]);
  const { user } = useStoreState(state => state);

  useEffect(() => {
    if (user && user._id === userId) {
      if (!UserService.isConnected)
        UserService.connectUser(user);
     } else navigate("/login");
  }, [user])

  return (
    <main className="h-screen w-screen bg-bgGradient">
      <NavBar navItems={navItems} />
      <div className="flex flex-row justify-center items-center h-full w-full pt-5">
        <Outlet context={[setNavItems]} />
      </div>
    </main>
  );
};

export default AppLayout;
