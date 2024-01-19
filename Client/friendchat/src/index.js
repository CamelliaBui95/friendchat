import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Home from "./components/home/Home";
import Root from "./Root";
import { createStore, StoreProvider, persist } from "easy-peasy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import storeModel from "./models/model";
import Login from "./components/login/login";
import Register from "./components/register/Register";

const store = createStore(persist(storeModel, { allow: ["user"] }));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <Root/>
  </StoreProvider>
);

