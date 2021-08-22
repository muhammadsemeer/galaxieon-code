import React, { FC, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Database from "../../Database";
import { RootState } from "../../store";
import handleError from "../../utils/Error";
import Editor from "./Editor";
import Tab from "./Tab";
import styles from "./wrapper.module.scss";
import axios from "../../api/index";
import { AxiosError, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { setCode as setGlobalCode } from "../../store/editor/editor";
import { Socket } from "socket.io-client";

const EditorWrapper: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  const editor = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const history = useHistory();
  const [code, setCode] = useState<string>();
  const globalCode = useSelector(
    (state: RootState) => state.editor.code
  );
  const database = useSelector((state: RootState) => state.editor.database);
  const currentTab = useSelector((state: RootState) => state.editor.currentTab);

  const getCode = () => {
    database
      .get(instance.id, currentTab as string)
      .then((result) => {
        if (!result) {
          let code = "";
          axios
            .get(`/instance/code/${instance.id}/${currentTab}`)
            .then((res: AxiosResponse<string>) => {
              code = res.data;
              return database.add(
                instance.id,
                currentTab as string,
                res.data
              );
            })
            .then((response) => {
              setCode(code);
              dispatch(
                setGlobalCode({
                  code,
                  key: currentTab as string,
                  isSaved: true,
                })
              );
            })
            .catch((error: AxiosError) =>
              handleError(error, history, dispatch, false)
            );
        } else {
          setCode(result.value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (instance.id && currentTab !== null) getCode();
  }, [currentTab]);

  return (
    <>
      {editor.activeTabs.length != 0 && (
        <>
          <div className={`${styles.tab} flex`}>
            {editor.activeTabs.map(({ name, key }) => (
              <Tab
                name={name}
                key={key}
                path={key}
                isSaved={editor.code[key]?.isSaved}
              />
            ))}
          </div>
        </>
      )}
      {code !== undefined && globalCode !== undefined && <Editor code={code} />}
    </>
  );
};

export default memo(EditorWrapper);
