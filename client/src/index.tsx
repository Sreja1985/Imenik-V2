import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LocationProvider } from "./context/location.context";
import { HeadquarterProvider } from "./context/headquarter.context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { DepartmentProvider } from "./context/department.context";
import { NumberProvider } from "./context/number.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <NumberProvider>
      <DepartmentProvider>
        <HeadquarterProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </HeadquarterProvider>
      </DepartmentProvider>
      </NumberProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
