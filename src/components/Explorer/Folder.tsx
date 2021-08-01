import { blue } from "@ant-design/colors";
import { FileFilled, FolderFilled, FolderOpenFilled } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React, { FC, memo, useState } from "react";
import File from "./File";
import styles from "./explorer.module.scss";
import { BaseType } from "antd/lib/typography/Base";
import { Files } from "../../types/templateAndInstance";
import useQuery from "../../utils/useQuery";

export interface FolderProps {
  name: string;
  files: string[];
  className?: string;
  folder?: Files[];
  parent?: string;
}

const Folder: FC<FolderProps> = ({
  name,
  files,
  className,
  folder,
  parent,
}) => {
  const query = useQuery();
  const filesInQuery = query.get("file")?.split("/").slice(0, -1).join("/");
  
  const [isOpen, setIsOpen] = useState(
    filesInQuery === parent ||
      (filesInQuery?.match(parent as string) &&
      filesInQuery?.match(parent as string)
        ? true
        : false)
  );
  const [nameType, setNameType] = useState<BaseType | undefined>("secondary");

  const onMouseEnter = () => {
    setNameType(undefined);
  };
  const onMouseLeave = () => {
    setNameType("secondary");
  };

  const handleClick = () => {
    setIsOpen((value) => !value);
  };

  return (
    <>
      <div
        className={`flex justify-content-between  ${
          styles.hoverable
        } ${className} ${isOpen && styles.active}`}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Space style={{ width: "100%" }}>
          {isOpen ? (
            <FolderOpenFilled style={{ color: blue.primary }} />
          ) : (
            <FolderFilled style={{ color: blue.primary }} />
          )}
          <Typography.Text type={isOpen ? undefined : nameType}>
            {name}
          </Typography.Text>
        </Space>
        <Space className={styles.icons}>
          <FileFilled />
          <FolderFilled />
        </Space>
      </div>
      {isOpen && (
        <div style={{ paddingLeft: 10 }}>
          {folder?.map(({ name: folderName, files, folder }) => (
            <Folder
              key={`${name}-${folderName}`}
              className={styles.files}
              name={folderName}
              files={files}
              folder={folder}
              parent={
                parent
                  ? `${parent}/${name}/${folderName}`
                  : `${name}/${folderName}`
              }
            />
          ))}
          {files.map((file) => (
            <File
              key={`${name}-${file}`}
              name={file}
              className={className}
              path={parent ? `${parent}/${file}` : `${name}/${file}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default memo(Folder);
