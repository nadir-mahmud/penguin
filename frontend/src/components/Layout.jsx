import React from "react";

import AuthHeader from "./AuthHeader";
import Footer from "./Footer";
import InitialHeader from "./InitialHeader";

const Layout = ({ children }) => {
  let authString = localStorage.getItem("auth");
  let auth = JSON.parse(authString);
  return (
    <>
      {auth?.token ? <AuthHeader /> : <InitialHeader />}
      <main className="main-content h-auto " style={{ height: "auto" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
