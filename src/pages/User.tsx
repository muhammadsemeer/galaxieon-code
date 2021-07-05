import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Error from "./Error";
const User: FC = () => {
  return (
    <Switch>
      <Route path="/login">{/* <UserLogin /> */}</Route>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
};

export default User;
