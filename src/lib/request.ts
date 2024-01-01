import axios, { Method } from "axios";
import { AppDispatch } from "../store";
import { getAccessToken, saveAccessToken } from "./token";
import { CONST } from "./constant";

export const normalRequest = async <T = any>(
  url: string,
  data: { [key: string]: any },
  method: Methods = "post",
  auth: boolean = true,
  head: { [key: string]: any } | null = null
): Promise<ResponseProp<T>> => {
  try {
    let headers: any = {
      "Content-Type": "application/json",
    }
    if (head) {
      headers = { ...headers, ...head }
    } else {
      const token = getAccessToken();
      if (auth && !token) throw new Error("INVALID_TOKEN");
      if (auth) {
        headers.Authorization = "Bearer " + token
      }
    }
    const res = await axios({
      method,
      url: CONST.BASE_URL + url,
      data: data,
      headers,
    })
    if (res.data?.data?.access_token) saveAccessToken(res.data?.data?.access_token)
    return res.data as ResponseProp<T>
  } catch (error: any) {
    return { status: false, message: error.response?.data?.message || error?.message, data: null as never }
  }
}

export const reduxRequest = <T>(
  url: string,
  data: { [key: string]: any },
  reduxFunc: (state: AnyReduxState<T>) => {
    payload: AnyReduxState<T>;
    type: string;
  },
  method: Methods = "post",
  auth: boolean = true,
) => async (dispatch: AppDispatch) => {
  try {
    const token = getAccessToken();
    if (auth && !token) throw new Error("INVALID_TOKEN");
    let headers: any = {
      "Content-Type": "application/json",
    }
    if (auth) {
      headers.Authorization = "Bearer " + token
    }
    dispatch(reduxFunc({ loading: "true" }));
    const res = await axios({
      method,
      url: CONST.BASE_URL + url,
      data: data,
      headers
    })
    dispatch(reduxFunc({ loading: "done", ...res.data }));
  } catch (error: any) {
    dispatch(reduxFunc({ status: false, message: error.response?.data?.message || error?.message, data: null, loading: "done" }));
  }
}

export const formRequest = async <T>(url: string, data: { [key: string]: any }, progressFunc: ((v: number) => void) | null = null, method: Method = 'post') => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const res = await axios({
      method,
      url: CONST.BASE_URL + url,
      data: formData,
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
      onUploadProgress: (e: any) => {
        if (progressFunc) {
          const percent = Math.round((e.loaded / e.total) * 100);
          progressFunc(percent);
        }
      },
    });
    return res.data as ResponseProp<T>
  } catch (error: any) {
    return { status: false, message: error.response?.data?.message || error?.message || 'Server error, please try again', data: null }
  }
}