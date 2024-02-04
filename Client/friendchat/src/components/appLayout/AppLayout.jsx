import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import UserService from "../../services/userServices";
import AppService from "../../services/appServices";
import "./appLayout.css";
import MessageService from "../../services/messageServices";

const AppLayout = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [navItems, setNavItems] = useState([]);
  const [hideNotif, setHideNotif] = useState(true);
  const [notif, setNotif] = useState("");
  const { user, notifications, allUsers, currentMessage } = useStoreState(
    (state) => state
  );
  const {
    addNotification,
    shiftNotifications,
    addConversation,
    forwardMessage,
    setAllUsers,
    updateUsers,
    updateConversation,
    setCurrentMessage,
  } = useStoreActions((actions) => actions);
  const getUser = useStoreState((state) => state.getUser);
  const hasConversation = useStoreState((state) => state.hasConversation);

  const handleCheckPacket = (packet) => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessage({ key: receiver, msg: packet });

    if (sender === user._id) {
      if (!hasConversation(receiver)) {
        const other = getUser(receiver);

        return addConversation({
          _id: receiver,
          master: other.username,
          status: other.status,
          imgUrl: other.profile.imgUrl,
          message: packet,
        });
      } else return forwardMessage({ key: receiver, msg: packet });
    }

    if (!hasConversation(sender)) {
      const other = getUser(sender);
      return addConversation({
        _id: sender,
        master: other.username,
        status: other.status,
        imgUrl: other.profile.imgUrl,
        message: packet,
      });
    } else forwardMessage({ key: sender, msg: packet });
  };

  useEffect(() => {
    UserService.getAllUsers(setAllUsers);
    UserService.updateUserList((updatedUser) => {
      updateUsers(updatedUser);
      updateConversation({
        _id: updatedUser._id,
        master: updatedUser.username,
        status: updatedUser.status,
        imgUrl: updatedUser.profile.imgUrl,
      });
    });
  }, [allUsers]);

  useEffect(() => {
    AppService.getNotification(addNotification);
    MessageService.getMessage(setCurrentMessage);
  }, []);

  useEffect(() => {
    if (currentMessage && Object.keys(allUsers).length > 0)
      handleCheckPacket(currentMessage);
  }, [currentMessage]);

  useEffect(() => {
    if (user && user._id === userId) {
      if (!UserService.isConnected) UserService.connectUser(user);
    } else navigate("/login");
  }, [user]);

  useEffect(() => {
    if (notifications.length === 0) return;

    setNotif(notifications[0]);
    setHideNotif(false);

    const idTimeOut = setTimeout(() => {
      setHideNotif(true);
      shiftNotifications();
      clearTimeout(idTimeOut);
    }, 2000);
  }, [notifications]);

  return (
    <main className="h-screen w-screen bg-bgGradient">
      <NavBar navItems={navItems} />
      <div className="flex flex-row justify-center items-center h-full w-full pt-4">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="notification-container">
            <p
              className={`notification ${
                hideNotif ? "hide-notification" : ""
              } text-xl 3xl:text-3xl`}
            >
              {notif.notification}
            </p>
          </div>
          <Outlet context={[setNavItems, handleCheckPacket]} />
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
