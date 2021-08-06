import React, { FC, memo, useEffect, useRef } from "react";
import Monaco, {
  OnMount,
  BeforeMount,
  OnValidate,
  OnChange,
} from "@monaco-editor/react";
import useQuery from "../../utils/useQuery";
import extension from "../Explorer/ext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { setCode } from "../../store/editor/editor";

export interface EditorProps {
  code: string;
}

const Editor: FC<EditorProps> = ({ code }) => {
  const activeFile = useQuery().get("file");
  const fileArray = activeFile?.split("/");
  const fileName = fileArray?.[fileArray.length - 1];
  const fileExtension = fileName?.split(".")[fileName.split(".").length - 1];
  const monacoRef = useRef<editor.IStandaloneCodeEditor>();
  const value = useSelector(
    (state: RootState) => state.editor.code[activeFile || ""]
  );
  const dispatch = useDispatch();

  const handleEditorWillMount: BeforeMount = (monaco) => {
    fileExtension === "html"
      ? emmetHTML(monaco)
      : fileExtension === "css"
      ? emmetCSS(monaco)
      : emmetJSX(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = editor;
  };

  const onValidate: OnValidate = (markers) => {
    console.log(markers);
  };

  const onChange: OnChange = (value, ev) => {
    if (activeFile && value) {
      dispatch(setCode({ key: activeFile, code: value, isSaved: false }));
    }
  };

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
      }}
      loading={<></>}
    />
  );
};

export default memo(Editor);
