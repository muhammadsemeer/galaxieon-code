import { blue } from "@ant-design/colors";
import {
  ForkOutlined,
  HomeFilled,
  MoreOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Space, Typography } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import Logo from "../NavBar/Logo";

const TopNav: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  const auth = useSelector((state: RootState) => state.auth);

  const optionsOverlay = (
    <Menu style={{ padding: "10px 0" }}>
      <Menu.Item key="Home">
        <Link to="/dashboard">
          <HomeFilled /> Go Home
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header
      style={{
        height: 50,
        paddingBottom: 10,
        borderBottom: "1px solid #303030",
      }}
    >
      <div className="flex align-center">
        <Logo isNav={false} />
        <Typography.Text strong>Galaxieon Code</Typography.Text>
      </div>
      <Space>
        <Typography.Text type="secondary">
          {instance.User?.name} /
        </Typography.Text>
        <Typography.Text strong>{instance?.name}</Typography.Text>
      </Space>
      <Space size="middle">
        <Button type="primary" icon={<ShareAltOutlined />} size="small">
          Share
        </Button>
        <Button type="text" icon={<ForkOutlined />} size="middle">
          Fork
        </Button>
        <Avatar
          icon={<UserOutlined />}
          src={auth.user?.profileImage}
          style={{ background: blue.primary }}
        />
        <Dropdown overlay={optionsOverlay} trigger={["click"]}>
          <MoreOutlined />
        </Dropdown>
      </Space>
    </header>
  );
};

export default TopNav;
