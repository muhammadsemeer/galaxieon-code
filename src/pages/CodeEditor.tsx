import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavTab from "../components/Code/NavTab";
import { collapseWithPayload } from "../store/menu/collapsedSlice";

const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(collapseWithPayload(true));
  }, []);
  return (
    <>
      <NavTab />
    </>
  );
};

export default CodeEditor;
