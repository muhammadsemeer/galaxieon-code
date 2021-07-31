import { DatabaseFilled, FileFilled, ProfileFilled } from "@ant-design/icons";
import { Menu } from "antd";
import React, { FC } from "react";

const NavTab: FC = () => {
  return (
    <Menu
      inlineCollapsed
      style={{
        height: "calc(100vh - 50px)",
        padding: "25px 0",
        position: "fixed",
        marginTop: "50px",
        zIndex: 99,
        width: 50,
      }}
    >
      <Menu.Item key="1" icon={<ProfileFilled />}>
        Instance Info
      </Menu.Item>
      <Menu.Item key="2" icon={<FileFilled />}>
        File Explorer
      </Menu.Item>
    </Menu>
  );
};

export default NavTab;
