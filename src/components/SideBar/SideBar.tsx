import React, { FC } from "react";
import { Button, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  CloudServerOutlined,
  FileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

let keys: { [index: string]: string } = {
  "/admin": "1",
  "/admin/users": "2",
  "/admin/templates": "3",
  "/admin/instances": "4",
};

const SideBar: FC = () => {
  const location = useLocation();
  const collapsed = useSelector((state: RootState) => state.collapsed);

  return (
      <Menu
        style={{
          maxWidth: 225,
          height: "calc(100vh - 50px)",
          padding: "25px 0",
          position: "fixed",
          marginTop: "65px",
          zIndex: 99,
        }}
        defaultSelectedKeys={[keys[location.pathname]]}
        mode="inline"
        inlineCollapsed={collapsed}
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
        <Menu.Item key="4" icon={<CloudServerOutlined />}>
          <NavLink to="/admin/instances">Instances</NavLink>
        </Menu.Item>
      </Menu>
  );
};

export default SideBar;
