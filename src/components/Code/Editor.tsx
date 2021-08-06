import React, { FC, memo, useEffect, useRef } from "react";
import Monaco, {
  OnMount,
  BeforeMount,
  OnValidate,
  OnChange,
} from "@monaco-editor/react";
import useQuery from "../../utils/useQuery";
import extension from "../Explorer/ext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

export interface EditorProps {
  name: string;
  path: string;
  code: string;
}

const Editor: FC<EditorProps> = ({ name, path, code }) => {
  const fileArray = name.split("/");
  const fileName = fileArray?.[fileArray.length - 1];
  const fileExtension = fileName?.split(".")[fileName.split(".").length - 1];
  const monacoRef = useRef<editor.IStandaloneCodeEditor>();

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
    console.log(value);
  };

  return (
    <Monaco
      height="calc(100vh - 92px)"
      theme="vs-dark"
      defaultLanguage={fileExtension ? extension[fileExtension] : ""}
      defaultValue={code}
      path={path}
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
