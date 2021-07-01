import React, { FC } from "react";
import { Route } from "react-router-dom";
import Login from "./AdminLogin";

const Admin: FC = () => {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>
    </>
  );
};

export default Admin;
