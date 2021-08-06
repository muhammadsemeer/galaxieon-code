import { CloseOutlined, DotChartOutlined, FileFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { FC, MouseEventHandler } from "react";
import styles from "./tab.module.scss";
import extensions from "../Explorer/ext";
import { blue } from "@ant-design/colors";
import { iconsURL } from "../../utils/constants";
import useQuery from "../../utils/useQuery";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeActiveTab } from "../../store/editor/editor";

export interface TabProps {
  name: string;
  path: string;
  isSaved: boolean;
}

const Tab: FC<TabProps> = ({ name, path, isSaved }) => {
  const splittedName = name.split(".");
  const ext = splittedName[splittedName.length - 1];

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const active: MouseEventHandler<HTMLDivElement> = (event) => {
    history.replace({
      search: `file=${path}`,
    });
  };

  const close: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    dispatch(removeActiveTab(path));
    query.delete("file");
    history.replace({
      search: query.toString(),
    });
  };

  return (
    <div
      className={`${styles.tab} flex justify-content-evenly align-center ${
        query.get("file") === path && styles.active
      }`}
      onClick={active}
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
        className={`flex middle ${styles.saved}`}
        icon={
          isSaved ? (
            <CloseOutlined style={{ fontSize: 12 }} />
          ) : (
            <span
              className={styles.notSaved}
            ></span>
          )
        }
        onClick={close}
      />
    </div>
  );
};

export default Tab;
