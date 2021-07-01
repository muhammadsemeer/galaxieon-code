import React from "react";
import logo from "./logo.svg";
import { Route } from "react-router-dom";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Route path="/admin">
      <Admin />
    </Route>
  );
};

export default App;
