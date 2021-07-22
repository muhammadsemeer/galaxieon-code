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

export type UserProp = { isAdmin: boolean };

const User: FC<UserProp> = ({ isAdmin }) => {
  const history = useHistory();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get("/auth/logout/admin");
    dispatch(logOut(isAdmin ? "admin" : "user"));
    history.push(isAdmin ? "/admin/login" : "/login");
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
          Welcome{" "}
          <Typography.Text strong>
            {auth[isAdmin ? "admin" : "user"]?.name}
          </Typography.Text>
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
