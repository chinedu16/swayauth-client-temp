"use server";
import { CONST } from "../constant";
import { normalRequest } from "../request";
import { LoginProp } from "../types";

export const handleLoginform = async (_: any, e: FormData): Promise<ResponseProp<LoginProp | null>> => {
  const data = { email: e.get('email'), password: e.get('password') }
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  return await normalRequest<LoginProp>(CONST.AUTH.MANUAL_LOGIN, data, 'post', false, header)
}

export const handleRegisterForm = async (_: any, e: FormData): Promise<ResponseProp<LoginProp | null>> => {
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  const data = { email: e.get('email'), password: e.get('password') }
  return await normalRequest(CONST.AUTH.MANUAL_REGISTER, data, 'post', false, header)
}
