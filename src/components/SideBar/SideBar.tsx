import React, { FC } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
} from "@ant-design/icons";

let keys: { [index: string]: string } = {
  "/admin": "1",
  "/admin/users": "2",
  "/admin/templates": "3",
  "/admin/profile": "4",
};

const SideBar: FC = () => {
  const location = useLocation();

  return (
    <Menu
      style={{
        width: 225,
        height: "calc(100vh - 50px)",
        padding: "25px 0",
        position: "fixed",
        marginTop: "65px",
        zIndex: 99,
      }}
      defaultSelectedKeys={[keys[location.pathname]]}
      mode="inline"
    >
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <NavLink to="/admin">DashBoard</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />}>
        <NavLink to="/admin/users">Users</NavLink>
      </Menu.Item>
      <Menu.Item key="3" icon={<FileOutlined />}>
        <NavLink to="/admin/templates">Templates</NavLink>
      </Menu.Item>
      <Menu.Item key="4" icon={<UserOutlined />}>
        <NavLink to="/admin/profile">My Profile</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;
