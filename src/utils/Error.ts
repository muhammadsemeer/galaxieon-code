import { AxiosError } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { logOut } from "../store/auth/authSlice";

const handleError = (
  { response }: AxiosError,
  history: any,
  dispatch: Dispatch<any>,
  isAdmin: boolean
) => {
  if (!response)
    return history.push("/error", {
      status: "error",
      title: "Something Went Wrong !",
      subTitle: "Make Sure Your Device is Connected or Try Again Later",
    });
  if (response?.status !== 401)
    return history.push("/error", {
      status: response?.status,
      title: response?.statusText,
      ...response?.data,
    });
  dispatch(logOut(isAdmin ? "admin" : "user"));
  history.push(isAdmin ? "/admin/login" : "/login");
};

export default handleError;
