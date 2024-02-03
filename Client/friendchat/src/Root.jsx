import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Socket from "./services/socket";
import UserService from "./services/userServices";
import MessageService from "./services/messageServices";
import { useStoreActions } from "easy-peasy";
import "./root.css";
import Home from "./components/home/Home";
import App from "./App";
import LandingLayout from "./components/landingLayout/LandingLayout";
import Login from "./components/login/login";
import Register from "./components/register/Register";
import AppLayout from "./components/appLayout/AppLayout";
import ProfileController from "./components/profile/ProfileController";
import AppService from "./services/appServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/app/:userId",
    element: <AppLayout />,
    children: [
      {
        path: "platform",
        element: <App />,
      },
      {
        path: "profile/:userId",
        element: <ProfileController />
      },
    ],
  },
]);



const Root = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const { setAuthToken, setUserToken } = useStoreActions((actions) => actions);

  useEffect(() => {
    Socket.addHandler(UserService);
    Socket.addHandler(MessageService);
    Socket.addHandler(AppService);

    const authToken = sessionStorage.getItem("authToken");
    const userToken = sessionStorage.getItem("userToken");

    if (userToken) setUserToken(userToken);
    if (authToken) {
      Socket.pollSocket(authToken);
      setAuthToken(authToken);
    } else return;

    Socket.hasConnected(setSocketConnected);

  }, []);

  if (!socketConnected && sessionStorage.getItem("authToken")) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default Root;
