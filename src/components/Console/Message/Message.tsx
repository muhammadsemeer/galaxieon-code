import React, { ReactElement } from "react";
import { Tag } from "antd";
import { Typography } from "antd";
import "./message.scss";
import {
  CloseCircleOutlined,
  InfoCircleFilled,
  WarningFilled,
} from "@ant-design/icons";

interface Props {
  type: string;
  txt: string;
  location: string;
  section?: string;
}
const { Text, Link } = Typography;

export default function Message({
  txt,
  type,
  location,
  section,
}: Props): ReactElement {
  return (
    <>
      {type === "log" ? (
        <Text code className="message txt_log">
          <Text>{txt}</Text>
          <Text type="secondary" className="location" underline>
            {location}
          </Text>
        </Text>
      ) : (
        <Tag
          color={
            type === "error" ? "red" : type === "warning" ? "yellow" : "blue"
          }
          icon={
            type === "error" ? (
              <CloseCircleOutlined />
            ) : type === "warning" ? (
              <WarningFilled />
            ) : (
              <InfoCircleFilled />
            )
          }
          className={`message error_log ${
            section === "problems" && "problems_message"
          }`}
        >
          <span>{txt}</span>
          <Text type="secondary" className="location" underline>
            {location}
          </Text>
        </Tag>
      )}
    </>
  );
}
