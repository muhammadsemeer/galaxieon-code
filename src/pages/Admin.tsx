import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./AdminLogin";

const Admin: FC = () => {
  return (
    <>
      <Route path="/admin/login">
        <Login />
      </Route>
    </>
  );
};

export default Admin;
