import React, { FC } from "react";
import { Menu, Dropdown, Avatar, Typography, Space } from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

const menu = (
  <Menu>
    <Menu.Item>
      <a>Log Out</a>
    </Menu.Item>
  </Menu>
);

const User: FC = () => {
  const admin = useSelector((state: RootState) => state.auth.admin);
  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["click"]}>
      <Typography.Text>
        <Space size="middle">
          Welcome <Typography.Text strong>{admin?.name}</Typography.Text>
          <Avatar
            icon={<UserOutlined />}
            style={{ background: blue.primary }}
          />
          <CaretDownOutlined />
        </Space>
      </Typography.Text>
    </Dropdown>
  );
};

export default User;
