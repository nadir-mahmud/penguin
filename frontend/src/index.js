import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { HomeProvider } from "./context/HomeContext";
import { SearchProvider } from "./context/SearchContext";
import { SearchDisableProvider } from "./context/SearchDisableContext";
import "flowbite";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SearchDisableProvider>
    <SearchProvider>
      <HomeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HomeProvider>
    </SearchProvider>
  </SearchDisableProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
