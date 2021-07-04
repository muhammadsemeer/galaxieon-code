import React, { FC, PropsWithChildren } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { RootState } from "../../store/index";
import { useSelector } from "react-redux";

const AdminRoute: FC<PropsWithChildren<RouteProps>> = ({
  children,
  ...rest
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={() =>
        auth.login && auth.admin ? children : <Redirect to="/admin/login" />
      }
    />
  );
};

export default AdminRoute;
