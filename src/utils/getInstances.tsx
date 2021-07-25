import { AxiosError, AxiosResponse } from "axios";
import axios from "../api/index";
import { AppDispatch } from "../store";
import { Instance } from "../types/templateAndInstance";
import handleError from "./Error";
import { addInstances } from "../store/instance/instanceSlice";

type cb = (loaded: boolean) => void;

const getInstances = (history: any, dispatch: AppDispatch, cb: cb) => {
  cb(true);
  axios
    .get("/instance")
    .then((res: AxiosResponse<Instance[]>) => {
      cb(false);
      dispatch(addInstances(res.data));
    })
    .catch((err: AxiosError) => {
      handleError(err, history, dispatch, false);
    });
};

export default getInstances;
