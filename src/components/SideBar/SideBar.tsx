import React, { FC, ReactNode } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

let keys: { [index: string]: string } = {
  "/admin": "1",
  "/admin/users": "2",
  "/admin/templates": "3",
  "/admin/instances": "4",
};

export interface SideBarProps {
  menus: Array<{ key: string; name: string; icon: ReactNode; to: string }>;
  isAdmin: boolean;
}

const SideBar: FC<SideBarProps> = ({ menus }) => {
  const location = useLocation();
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const defaultSelectedKeys = menus
    .filter(
      (menu) =>
        menu.to.split("/").join("") === location.pathname.split("/").join("")
    )
    .map((menu) => menu.key);
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
      defaultSelectedKeys={defaultSelectedKeys}
      mode="inline"
      inlineCollapsed={collapsed}
    >
      {menus.map((menu) => (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <NavLink to={menu.to}>{menu.name}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SideBar;
