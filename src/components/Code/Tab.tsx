import { CloseOutlined, DotChartOutlined, FileFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { FC, MouseEventHandler } from "react";
import styles from "./tab.module.scss";
import extensions from "../Explorer/ext";
import { blue } from "@ant-design/colors";
import { iconsURL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveTab,
  setActiveTab,
  setActiveTabs,
} from "../../store/editor/editor";
import { RootState } from "../../store";

export interface TabProps {
  name: string;
  path: string;
  isSaved: boolean;
}

const Tab: FC<TabProps> = ({ name, path, isSaved }) => {
  const splittedName = name.split(".");
  const ext = splittedName[splittedName.length - 1];
  const currentTab = useSelector((state: RootState) => state.editor.currentTab);
  const dispatch = useDispatch();

  const active: MouseEventHandler<HTMLDivElement> = (event) => {
    dispatch(setActiveTab(path));
    let fileArrays = path?.split("/");
    let file = fileArrays?.[fileArrays.length - 1];
    dispatch(
      setActiveTabs({
        name: file as string,
        key: path as string,
      })
    );
  };

  const close: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    dispatch(removeActiveTab(path));
    dispatch(setActiveTab(null));
  };

  return (
    <div
      className={`${styles.tab} flex justify-content-evenly align-center ${
        currentTab === path && styles.active
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
            <span className={styles.notSaved}></span>
          )
        }
        onClick={close}
      />
    </div>
  );
};

export default Tab;
