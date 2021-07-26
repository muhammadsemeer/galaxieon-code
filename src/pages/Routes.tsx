import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import AdminDash from "./AdminDash";
import Login from "./AdminLogin";
import AdminRoute from "../components/Private/AdminRoute";
import AdminUsers from "./AdminUsers";
import Error from "./Error";
import UserLogin from "./UserLogin";
import CreateUser from "./CreateUser";
import AdminTemplates from "./AdminTemplates";
import AdminInstances from "./AdminInstances";
import UserRoute from "../components/Private/UserRoute";
import UserDash from "./UserDash";
import AllInstances from "./AllInstance";

const Admin: FC = () => {
  return (
    <Switch>
      {/* Admin Routers */}
      <Route path="/admin/login">
        <Login />
      </Route>
      <AdminRoute exact path="/admin">
        <AdminDash />
      </AdminRoute>
      <AdminRoute path="/admin/users">
        <AdminUsers />
      </AdminRoute>
      <AdminRoute path="/admin/create/user">
        <CreateUser />
      </AdminRoute>
      <AdminRoute path="/admin/templates">
        <AdminTemplates />
      </AdminRoute>
      <AdminRoute path="/admin/instances">
        <AdminInstances />
      </AdminRoute>

      {/* User Routes */}
      <Route path="/login">
        <UserLogin />
      </Route>
      <UserRoute path="/dashboard">
        <UserDash />
      </UserRoute>
      <UserRoute path="/instances">
        <AllInstances />
      </UserRoute>

      {/* 404 And Error */}
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
};

export default Admin;
