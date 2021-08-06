import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "../api/index";
import { AxiosError, AxiosResponse } from "axios";
import React, { FC, useEffect, useRef, useState } from "react";
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
import useQuery from "../utils/useQuery";
import { setActiveTabs } from "../store/editor/editor";
import Database from "../Database";

const database = new Database("g_code", 1);
const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const instance = useSelector((state: RootState) => state.editorInstance);
  const showPane = useSelector(
    (state: RootState) => state.editorSidePane.showPane
  );
  const query = useQuery();

  const createDB = (instance: Instance) => {
    database
      .init([
        {
          name: instance.id,
          options: { keyPath: "key" },
        },
      ])
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        history.push("/error", {
          status: "error",
          title: "Incompatible Browser",
          message: "Update Browser",
        });
      });
  };

  useEffect(() => {
    dispatch(collapseWithPayload(true));
    axios
      .get(`/instance/${id}`)
      .then((response: AxiosResponse<Instance>) => {
        dispatch(addInstance(response.data));
        createDB(response.data);
      })
      .catch((error: AxiosError) =>
        handleError(error, history, dispatch, false)
      );
  }, []);


  useEffect(() => {
    if (query.get("file")) {
      let fileArrays = query.get("file")?.split("/");
      let file = fileArrays?.[fileArrays.length - 1];
      dispatch(
        setActiveTabs({
          name: file as string,
          key: query.get("file") as string,
        })
      );
    }
  }, [query.get("file")]);

  const constrains = [
    250,
    (window.innerWidth - 250) / 2,
    (window.innerWidth - 250) / 2,
  ];
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
        {!isLoading && <EditorWrapper database={database} />}
        <div></div>
      </ResizablePanels>
    </Spin>
  );
};

export default CodeEditor;
