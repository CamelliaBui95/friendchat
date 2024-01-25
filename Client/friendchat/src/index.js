import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./Root";
import { createStore, StoreProvider, persist } from "easy-peasy";
import storeModel from "./models/model";


const store = createStore(persist(storeModel, { allow: ["user"] }));


ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <Root/>
  </StoreProvider>
);

