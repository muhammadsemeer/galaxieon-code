import React, { FC } from "react";
import InstanceDetails from "./InstanceDetails";
import styles from "./wrapper.module.scss";

const ExpWrapper: FC = () => {
  return (
    <div className={styles.wrapper}>
      <InstanceDetails />
    </div>
  );
};

export default ExpWrapper;
