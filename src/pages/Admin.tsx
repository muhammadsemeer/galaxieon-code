import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import AdminDash from "./AdminDash";
import Login from "./AdminLogin";
import AdminRoute from "../components/Private/AdminRoute";
import AdminUsers from "./AdminUsers";
import Error from "../pages/Error";

const Admin: FC = () => {
  return (
    <Switch>
      <Route path="/admin/login">
        <Login />
      </Route>
      <AdminRoute exact path="/admin">
        <AdminDash />
      </AdminRoute>
      <AdminRoute path="/admin/users">
        <AdminUsers />
      </AdminRoute>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
};

export default Admin;
