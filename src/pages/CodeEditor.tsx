import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { collapseWithPayload } from "../store/menu/collapsedSlice";

const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(collapseWithPayload(true));
  }, []);
  return <div></div>;
};

export default CodeEditor;
