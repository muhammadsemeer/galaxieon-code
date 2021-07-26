import React, { useEffect } from "react";
import NavBar from "./components/NavBar/Index";
import Routes from "./pages/Routes";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { collapseWithPayload } from "./store/menu/collapsedSlice";

const App = () => {
  let admin = useRouteMatch("/admin*");
  let login = useRouteMatch("*/login");

  return (
    <>
      {!login && <NavBar isAdmin={admin ? true : false} />}
      <Routes />
    </>
  );
};

export default App;
