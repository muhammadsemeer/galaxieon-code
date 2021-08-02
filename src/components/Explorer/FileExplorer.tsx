import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Files } from "../../types/templateAndInstance";
import File from "./File";
import styles from "./explorer.module.scss";
import { Button, Space, Typography } from "antd";
import { FileFilled, FolderFilled } from "@ant-design/icons";
import Folder from "./Folder";

const FileExplorer: FC = () => {
  const allFiles = useSelector(
    (state: RootState) => state.editorInstance.files
  );

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.head} ${styles.hoverable} flex justify-content-between align-center`}
      >
        <Typography.Text strong>{allFiles.name}</Typography.Text>
        <Space className={styles.icons}>
          <FileFilled />
          <FolderFilled />
        </Space>
      </div>
      <div>
        {allFiles.folder?.map(({ name, files, folder }) => (
          <Folder
            key={`${allFiles.name}-${name}`}
            className={styles.files}
            name={name}
            files={files}
            folder={folder}
            parent={name}
          />
        ))}
        {allFiles.files.map((file) => (
          <File className={styles.files} key={file} name={file} path={file} />
        ))}
      </div>
    </div>
  );
};

export default memo(FileExplorer);
