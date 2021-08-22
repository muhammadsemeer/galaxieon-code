import { blue } from "@ant-design/colors";
import { FileFilled } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import React, { FC, useState, memo, MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import { iconsURL } from "../../utils/constants";
import extensions from "./ext";
import styles from "./explorer.module.scss";
import { setActiveTab, setActiveTabs } from "../../store/editor/editor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

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

  const onMouseEnter = () => {
    setNameType(undefined);
  };
  const onMouseLeave = () => {
    setNameType("secondary");
  };

  const currentTab = useSelector((state: RootState) => state.editor.currentTab);
  const fileNameArray = currentTab && currentTab?.split("/");
  const isActive =
    fileNameArray && fileNameArray[fileNameArray.length - 1] === name;
    const dispatch = useDispatch();
    const active: MouseEventHandler<HTMLDivElement> = (event) => {
      dispatch(setActiveTab(path as string));
      let fileArrays = path?.split("/");
      let file = fileArrays?.[fileArrays.length - 1];
      dispatch(
        setActiveTabs({
          name: file as string,
          key: path as string,
        })
      );
    };

  return (
    <div
      className={`${className} ${isActive && styles.active}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={active}
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
