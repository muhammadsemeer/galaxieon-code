import React, { FC, memo, useRef } from "react";
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

const Editor: FC = () => {
  const query = useQuery();
  const activeFile = query.get("file");
  const fileArray = activeFile?.split("/");
  const fileName = fileArray?.[fileArray.length - 1];
  const fileExtension = fileName?.split(".")[fileName.split(".").length - 1];
  const code = useSelector((state: RootState) => state.code);
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
      defaultValue={code[activeFile ? activeFile : ""]}
      path={activeFile ? activeFile : ""}
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
