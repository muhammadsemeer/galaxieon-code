import React, { FC } from "react";
import ResizablePanels from "../Resizable/ResizablePanels";
import InstanceDetails from "./InstanceDetails";
import styles from "./wrapper.module.scss";

const ExpWrapper: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ResizablePanels
        constrains={[250, window.innerWidth / 2, window.innerWidth / 2]}
        height={"calc(100vh - 52px)"}
        minConstrains={[250, 150, 150]}
      >
        <InstanceDetails />
        <div></div>
        <div></div>
      </ResizablePanels>
    </div>
  );
};

export default ExpWrapper;
