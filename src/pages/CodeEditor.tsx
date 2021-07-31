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

const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const instance = useSelector((state: RootState) => state.editorInstance);

  useEffect(() => {
    dispatch(collapseWithPayload(true));
    console.log(id);
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
  return (
    <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
      <Nav />
      <ExpWrapper />
    </Spin>
  );
};

export default CodeEditor;
