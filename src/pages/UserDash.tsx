import { Affix, Divider, PageHeader } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const UserDash = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);

  return (
    <main className={`p-top p-left ${collapsed && "collapsed"} p-right`}>
      <Affix offsetTop={75}>
        <PageHeader title="Dashboard" />
        <Divider style={{ margin: "0" }} />
      </Affix>
    </main>
  );
};

export default UserDash;
