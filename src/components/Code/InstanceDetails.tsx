import {
  EditOutlined,
  EyeOutlined,
  ForkOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Select, Space, Switch, Tag, Typography } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const InstanceDetails: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div style={{ padding: 10, maxWidth: 250 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div className="flex justify-content-between">
          <Typography.Text>{instance?.name}</Typography.Text>
          {user?.id === instance.User?.id && (
            <Button type="text" icon={<EditOutlined />} />
          )}
        </div>
        {user?.id === instance.User?.id && (
          <Typography.Text type="secondary">
            {instance?.description || "Add Some Short Description"}
          </Typography.Text>
        )}
      </Space>
      <div className="flex" style={{ marginTop: 10 }}>
        <Avatar src={instance.User?.profileImage} shape="square" />
        <div
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            fontSize: 13,
          }}
        >
          <Typography.Text>{instance.User?.name}</Typography.Text>
          <Typography.Text type="secondary">
            {instance.User?.email.split("@")[0]}
          </Typography.Text>
        </div>
      </div>
      <div
        className="flex justify-content-between"
        style={{ marginTop: 15, maxWidth: 250 }}
      >
        <div>
          <LikeOutlined /> {instance.likes}
        </div>
        <div>
          <ShareAltOutlined /> {instance.shares}
        </div>
        <div>
          <ForkOutlined /> {instance.forks}
        </div>
        <div>
          <EyeOutlined /> {instance.views}
        </div>
      </div>
      <div className="flex" style={{ marginTop: 10 }}>
        {instance?.keywords?.split(",").map((keyword, index) => (
          <Tag key={keyword} color="blue">
            {keyword}
          </Tag>
        ))}
      </div>
      {user?.id === instance.User?.id && (
        <Space direction="vertical" style={{ marginTop: 15 }}>
          <Typography.Text>
            AutoSave: <Switch size="small" checked={instance.autosave} />
          </Typography.Text>
          <Typography.Text>
            AutoPreview: <Switch size="small" checked={instance.autopreview} />
          </Typography.Text>
        </Space>
      )}
    </div>
  );
};

export default InstanceDetails;
