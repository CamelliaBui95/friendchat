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
        children: [],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
]);

/*const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider store={store}>
    <Root children={<App />} />
  </StoreProvider>
);*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <RouterProvider router={router}/>
  </StoreProvider>
)