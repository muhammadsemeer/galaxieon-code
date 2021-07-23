import React, { FC } from "react";
import { Menu, Dropdown, Avatar, Typography, Space, Button } from "antd";
import { BellFilled, CaretDownOutlined, PlusCircleFilled, UserOutlined } from "@ant-design/icons";
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
    <Space size="middle">
    {!isAdmin && (
    <>
    <Button type="text" size="middle" icon={<PlusCircleFilled />} />
    </>
    )}
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
          <Space>
            {isAdmin && (
              <Typography.Text strong>{auth.admin?.name}</Typography.Text>
            )}
            <Avatar
              icon={<UserOutlined />}
              src={!isAdmin && auth.user?.profileImage}
              style={{ background: blue.primary }}
            />
            <CaretDownOutlined />
          </Space>
        </Typography.Text>
      </Dropdown>
    </Space>
  );
};

export default User;
