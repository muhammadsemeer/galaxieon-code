import { LoadingOutlined } from "@ant-design/icons";
import { Spin, notification } from "antd";
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
import {
  addInstance,
  clearAllInstances,
} from "../store/instance/editorInstance";
import ExpWrapper from "../components/Code/ExpWrapper";
import ResizablePanels from "../components/Resizable/ResizablePanels";
import EditorWrapper from "../components/Code/EditorWrapper";
import {
  clearAll,
  setActiveTabs,
  setDatabase,
  setReadOnly,
  setSocket,
} from "../store/editor/editor";
import Database from "../Database";
import BrowserWrapper from "../components/out/BrowserWrapper";
import Console from "../components/Console/Console";
import { clearSidePane } from "../store/editor/sidePane";
import { editor as socket } from "../socket";
import { nanoid } from "nanoid";

const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const showPane = useSelector(
    (state: RootState) => state.editorSidePane.showPane
  );

  let { current: database } = useRef(new Database("g_code", 1));

  const createDB = (instance: Instance) => {
    database
      .init([
        {
          name: instance.id,
          options: { keyPath: "key" },
        },
      ])
      .then(() => {
        dispatch(setDatabase(database));
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
        database = new Database(`${response.data.id}___${nanoid()}`, 1);
        createDB(response.data);
      })
      .catch((error: AxiosError) =>
        handleError(error, history, dispatch, false)
      );
  }, []);


  useEffect(() => {
    socket.on("connect", () => {
      notification.success({
        message: "Editor Online",
        placement: "bottomRight",
        duration: 3,
      });
      socket.emit("join", id);
      dispatch(setSocket(socket));
    });
    let count = 0;
    socket.on("connect_error", (err) => {
      if (err.message === "User not Authentictaed") {
        return dispatch(setReadOnly(true));
      }
      setTimeout(() => {
        count += 1;
        if (count <= 3) {
          notification.error({
            message: "Disconnected",
            duration: 3,
            placement: "bottomRight",
          });
          notification.info({
            message: "Reconnecting",
            duration: 3,
            placement: "bottomRight",
          });
          socket.connect();
        }
      }, 3000);
    });
    return () => {
      socket.disconnect();
      dispatch(clearAll());
      dispatch(clearAllInstances());
      dispatch(clearSidePane());
      database.close();
    };
  }, []);

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
        constrains={
          showPane ? constrains : [window.innerWidth / 2, window.innerWidth / 2]
        }
        height={"100vh"}
        minConstrains={showPane ? minConstrains : minConstrains.slice(1)}
      >
        {showPane && <ExpWrapper />}
        {!isLoading && <EditorWrapper />}
        {!isLoading && <BrowserWrapper />}
      </ResizablePanels>
      <Console />
    </Spin>
  );
};

export default CodeEditor;
