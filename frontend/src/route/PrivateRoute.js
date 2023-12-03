import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../screens/Login";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  let auth2 = {};

  useEffect(() => {
    let auth = localStorage.getItem("auth");
    //console.log(auth);
    auth2 = JSON.parse(auth);
    auth2?.token ? setOk(true) : setOk(false);
  }, [auth2?.token]);

  return ok ? <Outlet /> : <Login />;
};

export default PrivateRoute;
