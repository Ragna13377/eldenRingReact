import styles from "./App.module.css";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@/app/store";
import { router } from "@/app/router";

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
};

export default App;
