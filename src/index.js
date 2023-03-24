import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import App from "./App";
import store from "./store/index.js";

import reportWebVitals from "./reportWebVitals";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </Provider>
    </LocalizationProvider>
  </ThemeProvider>
  // </React.StrictMode>
);

reportWebVitals();
