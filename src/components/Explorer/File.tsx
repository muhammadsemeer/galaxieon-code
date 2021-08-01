import { blue } from "@ant-design/colors";
import { FileFilled } from "@ant-design/icons";
import { Input, Space, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import React, { FC, useState } from "react";
import icons from "../../icons/icons";
import { iconsURL } from "../../utils/constants";
import extensions from "./ext";

export interface FileProps {
  key: string;
  name: string;
  edit?: boolean;
  className?: string;
}

const File: FC<FileProps> = ({ name, edit, className }) => {
  const namesArray = name.split(".");
  const ext = namesArray[namesArray.length - 1];
  const [nameType, setNameType] = useState<BaseType | undefined>("secondary");
  const onMouseEnter = () => {
    setNameType(undefined);
  };
  const onMouseLeave = () => {
    setNameType("secondary");
  };

  return (
    <div
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {edit ? null : (
        <Space>
          {extensions[ext] ? (
            <img
              style={{ width: 15 }}
              src={`${iconsURL}/${extensions[ext]}.svg`}
            />
          ) : (
            <FileFilled style={{ color: blue.primary }} />
          )}
          <Typography.Text type={nameType}>{name}</Typography.Text>
        </Space>
      )}
    </div>
  );
};

export default File;
