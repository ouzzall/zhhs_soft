import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { store } from "redux/store";
import { Provider } from "react-redux";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
