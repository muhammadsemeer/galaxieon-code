import {
  BellFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ForkOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, List } from "antd";
import React, { FC } from "react";
import { blue, red, yellow, green } from "@ant-design/colors";

export interface NotificationData {
  title: string;
  description: string;
  type: "success" | "error" | "warning" | "info" | "fork" | "like" | "share";
}

export interface NotificationProps {
  data: NotificationData[];
}

const icons = {
  success: <CheckCircleOutlined style={{ color: green.primary }} />,
  error: <CloseCircleOutlined style={{ color: red.primary }} />,
  warning: <ExclamationCircleOutlined style={{ color: yellow.primary }} />,
  info: <InfoCircleOutlined style={{ color: blue.primary }} />,
  like: <LikeOutlined style={{ color: blue.primary }} />,
  fork: <ForkOutlined style={{ color: blue.primary }} />,
  share: <ShareAltOutlined style={{ color: blue.primary }} />,
};

const Notification: FC<NotificationProps> = ({ data }) => {
  const overlay = (
    <List
      style={{ width: 320, padding: 20, maxHeight: 400, overflowY: "auto" }}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={icons[item.type]}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    ></List>
  );

  return (
    <Dropdown
      overlayStyle={{ position: "fixed" }}
      overlay={overlay}
      trigger={["click"]}
    >
      <Button
        type="text"
        size="middle"
        icon={
          <Badge color="blue">
            <BellFilled />
          </Badge>
        }
        style={{ margin: "0 10px" }}
      />
    </Dropdown>
  );
};

export default Notification;
