import React, { FC } from "react";
import { Menu, Dropdown, Avatar, Typography, Space, Button } from "antd";
import {
  BellFilled,
  CaretDownOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useHistory } from "react-router-dom";
import axios from "../../api/index";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/authSlice";
import styles from "./header.module.scss";
import OptionsDrop from "./OptionsDrop";

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

  const overlay = (
    <Menu style={{ padding: "10px 0" }}>
      {!isAdmin && (
        <>
          <Menu.Item key="create Instance">
            <a>
              <PlusCircleFilled /> New Instance
            </a>
          </Menu.Item>
          <Menu.Item key="profile">
            <a>
              <UserOutlined /> My Profile
            </a>
          </Menu.Item>
        </>
      )}
      <Menu.Item key="logout">
        <a onClick={handleLogout}>
          <LogoutOutlined /> Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Button
        type="text"
        size="middle"
        icon={<BellFilled />}
        style={{ margin: "0 10px" }}
      />
      <Space size="middle" className={styles.options}>
        <Dropdown
          overlay={overlay}
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
      <OptionsDrop overlay={overlay} />
    </div>
  );
};

export default User;
