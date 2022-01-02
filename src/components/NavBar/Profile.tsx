import React, { FC, useState } from "react";
import { Menu, Dropdown, Avatar, Typography, Space } from "antd";
import {
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
import Notification, { NotificationData } from "../Notification/Notification";
import CreateModal from "../CreateModal/CreateModal";
import { removeAllInstances } from "../../store/instance/instanceSlice";

export type UserProp = { isAdmin: boolean };

const dummyData: NotificationData[] = [
  {
    title: "Liked Your Instance",
    description: "James Liked Your Instance My App",
    type: "like",
  },
  {
    title: "Forked Your Instance",
    description: "James Forked Your Instance My App",
    type: "fork",
  },
  {
    title: "Shared Your Instance",
    description: "James Shared Your Instance My App",
    type: "share",
  },
  {
    title: "Waring",
    description: "You Have 1 Instance Left",
    type: "warning",
  },
  {
    title: "Error",
    description: "Something went wrong",
    type: "error",
  },
  {
    title: "Success",
    description: "Your Account Upgrade Request Verified",
    type: "success",
  },
  {
    title: "Info",
    description: "New Updates to Code Editor",
    type: "info",
  },
];

const User: FC<UserProp> = ({ isAdmin }) => {
  const history = useHistory();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get("/auth/logout/admin");
    dispatch(removeAllInstances());
    dispatch(logOut(isAdmin ? "admin" : "user"));
    history.push(isAdmin ? "/admin/login" : "/login");
  };

  const [isModalUp, setModalUp] = useState(false);

  const overlay = (
    <Menu style={{ padding: "10px 0" }}>
      {!isAdmin && (
        <>
          <Menu.Item key="create Instance">
            <a onClick={() => setModalUp(true)}>
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
      <Notification data={dummyData} />
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
      <CreateModal visible={isModalUp} onCancel={() => setModalUp(false)} />
    </div>
  );
};

export default User;
