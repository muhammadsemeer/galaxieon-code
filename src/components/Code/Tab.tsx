import { CloseOutlined, FileFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { FC } from "react";
import styles from "./tab.module.scss";
import extensions from "../Explorer/ext";
import { blue } from "@ant-design/colors";
import { iconsURL } from "../../utils/constants";
import useQuery from "../../utils/useQuery";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface TabProps {
  name: string;
  path: string;
}

const Tab: FC<TabProps> = ({ name, path }) => {
  const splitedName = name.split(".");
  const ext = splitedName[splitedName.length - 1];
  const instance = useSelector((state: RootState) => state.editorInstance)

  const query = useQuery();
  const history = useHistory()

  return (
    <div
      className={`${styles.tab} flex justify-content-evenly align-center ${
        query.get("file") === path && styles.active
      }`}
      onClick={() => history.push({
        pathname: `/instance/editor/${instance.id}`,
        search: `file=${path}`
      })}
    >
      {extensions[ext] ? (
        <img style={{ width: 20 }} src={`${iconsURL}/${extensions[ext]}.svg`} />
      ) : (
        <FileFilled style={{ color: blue.primary }} />
      )}
      <Typography.Text>{name}</Typography.Text>
      <Button
        type="text"
        size="small"
        icon={<CloseOutlined style={{ fontSize: 12 }} />}
      />
    </div>
  );
};

export default Tab;
