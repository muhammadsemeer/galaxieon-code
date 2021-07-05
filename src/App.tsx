import React from "react";
import NavBar from "./components/NavBar/Index";
import Admin from "./pages/Admin";
import { useRouteMatch } from "react-router-dom";
import User from "./pages/User";

const App = () => {
  let admin = useRouteMatch("/admin*");
  let login = useRouteMatch("*/login");
  return (
    <>
      {!login && <NavBar isAdmin={admin ? true : false} />}
      <Admin />
      <User />
    </>
  );
};

export default App;
