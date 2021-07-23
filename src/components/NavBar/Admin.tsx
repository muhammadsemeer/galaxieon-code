import React, { FC } from "react";
import SideBar, { SideBarProps } from "../SideBar/SideBar";
import Logo from "./Logo";
import Profile from "./Profile";
import {
  DashboardOutlined,
  CloudServerOutlined,
  FileOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Admin = () => {
  const sidebarProps: SideBarProps = {
    isAdmin: true,
    menus: [
      {
        name: "Dashboard",
        key: "dashboard",
        icon: <DashboardOutlined />,
        to: "/admin",
      },
      {
        name: "Users",
        key: "users",
        icon: <TeamOutlined />,
        to: "/admin/users",
      },
      {
        name: "Templates",
        key: "templates",
        icon: <FileOutlined />,
        to: "/admin/templates",
      },
      {
        name: "Instances",
        key: "instances",
        icon: <CloudServerOutlined />,
        to: "/admin/instances",
      },
    ],
  };

  return (
    <>
      <header>
        <Logo isNav />
        <Profile isAdmin />
      </header>
      <SideBar {...sidebarProps} />
    </>
  );
};

export default Admin;
