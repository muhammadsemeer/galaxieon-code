import React, { FC } from "react";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { Result, Button, Space } from "antd";

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
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: admin ? "75px 10px 75px 260px" : 0,
      }}
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
