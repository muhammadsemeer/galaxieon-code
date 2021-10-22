import React, { FC, memo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Browser from "./Browser";
import styles from "./browser.module.scss";

const BrowserWrapper: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  const [url, setUrl] = useState(
    `https://${instance.subdomain}.${process.env.PREVIEW}`
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}></div>
      <Browser url={url} />
    </div>
  );
};

export default memo(BrowserWrapper);
