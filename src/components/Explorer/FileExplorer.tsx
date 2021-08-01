import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Files } from "../../types/templateAndInstance";
import File from "./File";
import styles from "./explorer.module.scss";
import { Button, Space, Typography } from "antd";
import { FileFilled, FolderFilled } from "@ant-design/icons";
import Folder from "./Folder";

const FileExplorer: FC = () => {
  // const files = useSelector((state: RootState) => state.editorInstance.files);

  const allFiles: Files = {
    name: "Static",
    files: ["index.html"],
    folder: [
      { name: "styles", files: ["index.html"] },
      { name: "scripts", files: ["script.js"] },
    ],
  };
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.head} ${styles.hoverable} flex justify-content-between`}>
        <Typography.Text strong>{allFiles.name}</Typography.Text>
        <Space className={styles.icons}>
          <FileFilled />
          <FolderFilled />
        </Space>
      </div>
      <div>
        {allFiles.folder?.map(({ name, files }) => (
          <Folder key={`${allFiles.name}-${name}`} className={styles.files} name={name} files={files} />
        ))}
        {allFiles.files.map((file) => (
          <File className={styles.files} key={file} name={file} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
