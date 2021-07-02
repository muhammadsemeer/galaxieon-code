import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import AdminDash from "./AdminDash";
import Login from "./AdminLogin";

const Admin: FC = () => {
  return (
    <>
      <Route path="/admin/login">
        <Login />
      </Route>
      <Route exact path="/admin">
        <AdminDash />
      </Route>
    </>
  );
};

export default Admin;
