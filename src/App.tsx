import React from "react";
import NavBar from "./components/NavBar/Index";
import Routes from "./pages/Routes";
import { useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "./hooks/useMediaQuery";

const App = () => {
  let admin = useRouteMatch("/admin*");
  let login = useRouteMatch("*/login");
  let editor = useRouteMatch("/instance/editor/*");
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  isSmallScreen
    ? (window.location.href = "https://galaxieon.com/gcode.html")
    : null;

  return (
    <>
      {!login && !editor && <NavBar isAdmin={admin ? true : false} />}
      <Routes />
    </>
  );
};

export default App;
