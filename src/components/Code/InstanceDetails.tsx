import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const InstanceDetails: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  return (
    <div style={{ padding: 10 }}>
      <Space direction="vertical">
        <div className="flex justify-content-between">
          <Typography.Text>{instance?.name}</Typography.Text>
          <Button type="text" icon={<EditOutlined />} />
        </div>
        <Typography.Text type="secondary">
          {instance?.description || "Add Some Short Description"}
        </Typography.Text>
      </Space>
    </div>
  );
};

export default InstanceDetails;
