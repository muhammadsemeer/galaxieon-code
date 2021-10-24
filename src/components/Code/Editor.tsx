import React, { FC, memo, useEffect, useRef } from "react";
import Monaco, {
  OnMount,
  BeforeMount,
  OnValidate,
  OnChange,
} from "@monaco-editor/react";
import extension from "../Explorer/ext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { setCode } from "../../store/editor/editor";
import { Socket } from "socket.io-client";

export interface EditorProps {
  code: string;
}

const Editor: FC<EditorProps> = ({ code }) => {
  const activeFile = useSelector((state: RootState) => state.editor.currentTab);
  const fileArray = activeFile?.split("/");
  const fileName = fileArray?.[fileArray.length - 1];
  const fileExtension = fileName?.split(".")[fileName.split(".").length - 1];
  const monacoRef = useRef<editor.IStandaloneCodeEditor>();
  const value = useSelector(
    (state: RootState) => state.editor.code[activeFile || ""]
  );
  const dispatch = useDispatch();
  const instance = useSelector((state: RootState) => state.editorInstance);
  const socket = useSelector((state: RootState) => state.editor.socket);
  const database = useSelector((state: RootState) => state.editor.database);
  const isReadOnly = useSelector((state: RootState) => state.editor.isReadOnly);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const handleEditorWillMount: BeforeMount = (monaco) => {
    fileExtension === "html"
      ? emmetHTML(monaco)
      : fileExtension === "css"
      ? emmetCSS(monaco)
      : emmetJSX(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = editor;
    editor.addAction({
      id: "code.save",
      label: "Save",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
      contextMenuGroupId: "modification",
      contextMenuOrder: 1,
      run: (editor) => saveCode(editor),
    });
  };

  const onValidate: OnValidate = (markers) => {
    console.log(markers);
  };

  const onChange: OnChange = (value, ev) => {
    if (activeFile && value !== undefined) {
      dispatch(
        setCode({
          key: activeFile,
          code: value,
          isSaved: value === code,
        })
      );
    }
  };

  const saveCode = (editor?: editor.ICodeEditor) => {
    let code = editor?.getValue() ?? value.code;
    socket?.emit(
      "change",
      fileName,
      code,
      instance.id,
      userId,
      (err: Error, status: "OK" | "FAIL") => {
        if (err) {
          return console.log(err);
        }
        if (activeFile) {
          database
            .put(instance.id, activeFile, code)
            .then(() => {
              dispatch(
                setCode({
                  key: activeFile,
                  code,
                  isSaved: true,
                })
              );
            })
            .catch((err) => console.error(err));
        }
      }
    );
  };

  const beforeUnload = (event: BeforeUnloadEvent) => {
    if (!value.isSaved) {
      event.returnValue = true;
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnload);
    let timeOut: number;
    if (value?.code !== code && instance.autosave) {
      timeOut = setTimeout(saveCode, 500);
    }
    return () => {
      clearTimeout(timeOut);
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [value?.code]);

  return (
    <Monaco
      height="calc(100vh - 92px)"
      theme="vs-dark"
      defaultLanguage={fileExtension ? extension[fileExtension] : ""}
      defaultValue={code}
      path={activeFile || ""}
      value={value?.code}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      onValidate={onValidate}
      onChange={onChange}
      options={{
        minimap: {
          enabled: false,
        },
        fontFamily: "Fira Code",
        fontLigatures: true,
        readOnly: instance.UserId !== userId,
      }}
      loading={<></>}
    />
  );
};

export default memo(Editor);
