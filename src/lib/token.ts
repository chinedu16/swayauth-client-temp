import { jwtDecode } from "jwt-decode";
import Cookie from 'js-cookie'
import { CONST } from "./constant";

export const saveAccessToken = (token: string) => {
  Cookie.set(CONST.ACCESS_TOKEN, token);
}

export const getAccessToken = () => {
  return Cookie.get(CONST.ACCESS_TOKEN)
}

export const removeAccessToken = () => {
  Cookie.remove(CONST.ACCESS_TOKEN)
}

interface Decoded {
  exp: number
}

export const isGoodToken = (token?: string) => {
  try {
    const tk = token ?? Cookie.get(CONST.ACCESS_TOKEN) ?? '';
    console.log(Date.now(), (jwtDecode<Decoded>(tk)?.exp * 1000))
    return Date.now() < (jwtDecode<Decoded>(tk)?.exp * 1000);
  } catch (error: any) {
    return false
  }
}