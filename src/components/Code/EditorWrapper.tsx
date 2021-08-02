import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useQuery from "../../utils/useQuery";
import Tab from "./Tab";
import styles from "./wrapper.module.scss"

const EditorWrapper: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  const query = useQuery();
  const editor = useSelector((state: RootState) => state.editor);

  return (
    <>
      <div className={`${styles.tab} flex`}>
        {editor.activeTabs.map(({ name, key } ) => (
          <Tab name={name} key={key} path={key} />
        ))}
      </div>
    </>
  );
};

export default memo(EditorWrapper);
