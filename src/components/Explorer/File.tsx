import { blue } from "@ant-design/colors";
import { FileFilled } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import React, { FC, useState, memo } from "react";
import { useHistory } from "react-router-dom";
import { iconsURL } from "../../utils/constants";
import extensions from "./ext";
import styles from "./explorer.module.scss";
import useQuery from "../../utils/useQuery";

export interface FileProps {
  name: string;
  edit?: boolean;
  className?: string;
  path?: string;
}

const File: FC<FileProps> = ({ name, edit, className, path }) => {
  const namesArray = name.split(".");
  const ext = namesArray[namesArray.length - 1];
  const [nameType, setNameType] = useState<BaseType | undefined>("secondary");
  const history = useHistory();
  const query = useQuery();

  const onMouseEnter = () => {
    setNameType(undefined);
  };
  const onMouseLeave = () => {
    setNameType("secondary");
  };

  const fileNameArray = query.get("file") && query.get("file")?.split("/");
  const isActive =
    fileNameArray && fileNameArray[fileNameArray.length - 1] === name;
  return (
    <div
      className={`${className} ${isActive && styles.active}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        history.replace({
          search: `file=${path ? path : name}`,
        });
      }}
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
          <Typography.Text type={isActive ? undefined : nameType}>
            {name}
          </Typography.Text>
        </Space>
      )}
    </div>
  );
};

export default memo(File);
