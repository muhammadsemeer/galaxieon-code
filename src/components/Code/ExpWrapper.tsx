import React, { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InstanceDetails from "./InstanceDetails";
import styles from "./wrapper.module.scss";

const panes: { [index: string]: ReactNode } = {
  info: <InstanceDetails />,
};

const ExpWrapper: FC = () => {
  const activePane = useSelector(
    (state: RootState) => state.editorSidePane.activePane
  );
  return <div className={styles.wrapper}>{panes[activePane]}</div>;
};

export default ExpWrapper;
