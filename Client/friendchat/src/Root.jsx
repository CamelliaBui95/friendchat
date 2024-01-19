import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Socket from "./services/socket";
import UserService from "./services/userServices";
import MessageService from "./services/messageServices";
import { Outlet } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./root.css";
import NavBar from "./components/navBar/NavBar";
import Home from "./components/home/Home";
import App from "./App";
import LandingLayout from "./components/landingLayout/LandingLayout";
import Login from "./components/login/login";
import Register from "./components/register/Register";

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
    path: "app/:username",
    element: <App/>
  }
]);

const Root = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const { setAuthToken, setUserToken } = useStoreActions((actions) => actions);

  useEffect(() => {
    Socket.addHandler(UserService);
    Socket.addHandler(MessageService);

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
