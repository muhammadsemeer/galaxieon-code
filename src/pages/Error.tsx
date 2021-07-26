import React, { FC } from "react";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const Error: FC = () => {
  const { state }: any = useLocation();
  let admin = useRouteMatch("/admin*");
  const history = useHistory();
  const extra = state?.status ? (
    <Button type="primary" onClick={() => history.goBack()}>
      Try Again
    </Button>
  ) : (
    <Button type="primary" onClick={() => history.push(admin ? "/admin" : "/")}>
      Go Home
    </Button>
  );
  return (
    <main
    className="error-page"
    >
      <Result
        status={state?.status || "404"}
        title={state?.title || state?.status || "404"}
        subTitle={state?.subTitle || state?.message || "Page Not Found"}
        extra={extra}
      />
    </main>
  );
};

export default Error;
