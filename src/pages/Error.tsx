import React, { FC } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { Result } from "antd";

const Error: FC = () => {
  const { state }: any = useLocation();
  let admin = useRouteMatch("/admin*");
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
        title={state?.title || "404"}
        subTitle={state?.subTitle || "Page Not Found"}
      />
    </main>
  );
};

export default Error;
