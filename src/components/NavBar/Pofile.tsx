import React, { FC } from "react";
import { Menu, Dropdown, Avatar, Typography, Space } from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useHistory } from "react-router-dom";
import axios from "../../api/index";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/authSlice";

const User: FC = () => {
  const history = useHistory();
  const admin = useSelector((state: RootState) => state.auth.admin);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get("/auth/logout/admin");
    dispatch(logOut("admin"));
    history.push("/admin/login");
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <a onClick={handleLogout}>Log Out</a>
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
      arrow
      trigger={["click"]}
    >
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
