import { AxiosError, AxiosResponse } from "axios";
import axios from "../api/index";
import { AppDispatch } from "../store";
import { Instance } from "../types/templateAndInstance";
import handleError from "./Error";
import { addInstances } from "../store/instance/instanceSlice";

const getInstances = (history: any, dispatch: AppDispatch) => {
  axios
    .get("/instance")
    .then((res: AxiosResponse<Instance[]>) => {
      dispatch(addInstances(res.data));
    })
    .catch((err: AxiosError) => {
      handleError(err, history, dispatch, false);
    });
};

export default getInstances;
