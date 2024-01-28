import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Profile from "./Profile";
import { useStoreActions, useStoreState } from "easy-peasy";

const ProfileController = () => {
  const [setNavItems] = useOutletContext();
  const { handleLogOut } = useStoreActions((actions) => actions);
  const { user } = useStoreState((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const navItems = [
      { label: "Chat Room", path: "platform" },
      {
        label: "Log Out",
        func: () => {
          handleLogOut();
          navigate("/login");
        },
      },
    ];

    setNavItems(navItems);
  }, []);
  return <Profile user={user} />;
};

export default ProfileController;
