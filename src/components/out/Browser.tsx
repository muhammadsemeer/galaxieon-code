import React, { FC, memo, useEffect, useRef, useState } from "react";
import styles from "./browser.module.scss";

interface BrowserProps {
  url: string;
}

const Browser: FC<BrowserProps> = ({ url }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  return (
    <div style={{ background: "#fff" }}>
      <iframe
        src={url}
        ref={iframe}
        className={styles.frame}
      ></iframe>
    </div>
  );
};

export default memo(Browser);
