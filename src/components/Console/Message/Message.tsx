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
  location?: string;
  section?: string;
}
const { Text } = Typography;

export default function Message({
  txt,
  type,
  location,
  section,
}: Props): ReactElement {
  return (
    <div className="console_message">
      {type === "log" ? (
        <Text className="message txt_log">
          <Text code style={{ whiteSpace: "break-spaces" }}>
            {txt}
          </Text>
          <Text type="secondary" className="location" underline>
            {location ? `${location}` : ""}
          </Text>
        </Text>
      ) : (
        <Tag
          color={type === "error" ? "red" : type === "warn" ? "yellow" : "blue"}
          icon={
            type === "error" ? (
              <CloseCircleOutlined />
            ) : type === "warn" ? (
              <WarningFilled />
            ) : (
              <InfoCircleFilled />
            )
          }
          className={`message error_log ${
            section === "problems" && "problems_message"
          }`}
        >
          <Text>
            <code style={{ background: "none", border: "none" }}>{txt}</code>
          </Text>
          <Text type="secondary" className="location" underline>
            {location ? `${location}` : ""}
          </Text>
        </Tag>
      )}
    </div>
  );
}
