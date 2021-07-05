import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Error from "./Error";
import UserLogin from "./UserLogin";

const User: FC = () => {
  return (
    <Switch>
      <Route path="/login"><UserLogin /></Route>
      {/* <Route path="*">
        <Error />
      </Route> */}
    </Switch>
  );
};

export default User;
