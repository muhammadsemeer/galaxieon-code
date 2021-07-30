import { DatabaseFilled, FileFilled } from "@ant-design/icons";
import { Menu } from "antd";
import React, { FC } from "react";
import styles from "../SideBar/sidebar.module.scss";

const NavTab: FC = () => {
  return (
    <Menu
      className={styles.sidebar}
      inlineCollapsed
      style={{
        height: "calc(100vh - 50px)",
        padding: "25px 0",
        position: "fixed",
        marginTop: "50px",
        zIndex: 99,
      }}
    >
      <Menu.Item key="1" icon={<DatabaseFilled />}>
        Instance Info
      </Menu.Item>
      <Menu.Item key="2" icon={<FileFilled />}>
        File Explorer
      </Menu.Item>
    </Menu>
  );
};

export default NavTab;
