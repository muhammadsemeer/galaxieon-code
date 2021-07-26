import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, DropDownProps, Menu } from "antd";
import React, { FC, ReactElement, ReactNode } from "react";
import styles from "./header.module.scss";

const OptionsDrop: FC<DropDownProps> = (props) => {
  return (
    <Dropdown overlayStyle={{ position: "fixed" }} {...props} trigger={["click"]} className={styles["options-sm"]}>
      <MenuOutlined />
    </Dropdown>
  );
};

export default OptionsDrop;
