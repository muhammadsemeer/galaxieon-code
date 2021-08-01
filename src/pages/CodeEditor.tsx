import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "../api/index";
import { AxiosError, AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Nav from "../components/Code/Nav";
import { collapseWithPayload } from "../store/menu/collapsedSlice";
import { Instance } from "../types/templateAndInstance";
import handleError from "../utils/Error";
import { RootState } from "../store";
import { addInstance } from "../store/instance/editorInstance";
import ExpWrapper from "../components/Code/ExpWrapper";
import ResizablePanels from "../components/Resizable/ResizablePanels";
import EditorWrapper from "../components/Code/EditorWrapper";

const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const instance = useSelector((state: RootState) => state.editorInstance);
  const showPane = useSelector(
    (state: RootState) => state.editorSidePane.showPane
  );

  useEffect(() => {
    dispatch(collapseWithPayload(true));
    axios
      .get(`/instance/${id}`)
      .then((response: AxiosResponse<Instance>) => {
        dispatch(addInstance(response.data));
        setIsLoading(false);
      })
      .catch((error: AxiosError) =>
        handleError(error, history, dispatch, false)
      );
  }, []);
  const constrains = [250, window.innerWidth / 2, window.innerWidth / 2];
  const minConstrains = [250, 150, 150];
  return (
    <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
      <Nav />
      <ResizablePanels
        constrains={showPane ? constrains : constrains.slice(1)}
        height={"100vh"}
        minConstrains={showPane ? minConstrains : minConstrains.slice(1)}
      >
        {showPane && <ExpWrapper />}
        <EditorWrapper />
        <div></div>
      </ResizablePanels>
    </Spin>
  );
};

export default CodeEditor;
