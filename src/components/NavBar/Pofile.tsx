import React from "react";
import { Menu, Dropdown, Avatar, Typography, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>
      <a>Log Out</a>
    </Menu.Item>
  </Menu>
);

const User = () => {
  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["click"]}>
      <Typography.Text>
        <Space size="middle">
          Welcome <Typography.Text strong>Jhon Doe</Typography.Text>
          <Avatar src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <CaretDownOutlined />
        </Space>
      </Typography.Text>
    </Dropdown>
  );
};

export default User;
