import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import UserService from "../../services/userServices";
import AppService from "../../services/appServices";
import "./appLayout.css";

const AppLayout = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [navItems, setNavItems] = useState([]);
  const [hideNotif, setHideNotif] = useState(true);
  const [notif, setNotif] = useState("");
  const { user, notifications } = useStoreState(state => state);
  const { addNotification, shiftNotifications } = useStoreActions(actions => actions);

  useEffect(() => {
    AppService.getNotification(addNotification);
  }, [])

  useEffect(() => {
    if (user && user._id === userId) {
      if (!UserService.isConnected)
        UserService.connectUser(user);
     } else navigate("/login");
  }, [user])

  useEffect(() => {
    if (notifications.length === 0)
      return;

    setNotif(notifications[0]);
    setHideNotif(false);

    const idTimeOut = setTimeout(() => {
      setHideNotif(true);
      shiftNotifications();
      clearTimeout(idTimeOut);
    }, 2000);

  }, [notifications])

  return (
    <main className="h-screen w-screen bg-bgGradient">
      <NavBar navItems={navItems} />
      <div className="flex flex-row justify-center items-center h-full w-full pt-4">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="notification-container">
            <p className={`notification ${hideNotif ? "hide-notification" : ""} text-xl 3xl:text-3xl`}>{notif.notification}</p>
          </div>
          <Outlet context={[setNavItems]} />
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
