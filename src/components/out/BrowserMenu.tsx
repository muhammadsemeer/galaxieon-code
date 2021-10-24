import {
  CaretLeftOutlined,
  CaretRightFilled,
  CaretRightOutlined,
  ExpandAltOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { FC, useState } from "react";
import styles from "./browser.module.scss";

export interface BrowserMenuProps {
  url: string;
  // onSearch: (query: string) => void;
  // onReload: () => void;
  // onBack: () => void;
  // onForward: () => void;
}

const BrowserMenu: FC<BrowserMenuProps> = ({
  url,
  // onBack,
  // onForward,
  // onReload,
  // onSearch,
}) => {
  const [searchText, setSearchText] = useState(url);
  return (
    <div className={styles.menu}>
      <div>
        {/* <Button icon={<CaretLeftOutlined />} type="text" onClick={onBack} /> */}
        {/* <Button icon={<CaretRightOutlined />} type="text" onClick={onForward} /> */}
        {/* <Button icon={<ReloadOutlined />} type="text" onClick={onReload} /> */}
      </div>
      <div className={styles.search}>
        <Input.Search
          value={searchText}
          // onChange={(e) => setSearchText(e.currentTarget.value)}
          // onSearch={onSearch}
          readOnly
        />
      </div>
      <div>
        <Button href={url} target="_blank" icon={<ExpandAltOutlined />} type="text" />
      </div>
    </div>
  );
};

export default BrowserMenu;
