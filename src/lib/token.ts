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
    return Date.now() < (jwtDecode<Decoded>(tk)?.exp * 1000);
  } catch (error: any) {
    return false
  }
}

export const changeRemember = (r: boolean) => {
  if (typeof window != 'undefined') {
    if (r) {
      window.localStorage.setItem('remember', 'true');
      window.sessionStorage.removeItem('remember');
    } else {
      window.sessionStorage.setItem('remember', 'true');
      window.localStorage.removeItem('remember');
    }
  }
}

export const getRemember = () => {
  if (typeof window != 'undefined') {
    return (window.localStorage.getItem('remember') || window.sessionStorage.getItem('remember')) == 'true';
  }
  return true
}

export const removeRemember = () => {
  if (typeof window != 'undefined') {
    window.sessionStorage.removeItem('remember');
    window.localStorage.removeItem('remember');
  }
}