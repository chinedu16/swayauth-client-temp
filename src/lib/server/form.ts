"use server";
import { createCipheriv, createHash } from "crypto";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CONST } from "../constant";
import { formRequest, normalRequest } from "../request";
import { LoginProp } from "../types";

export const handleLoginform = async (_: any, e: FormData): Promise<ResponseProp<LoginProp | null>> => {
  const data = { email: e.get('email'), password: e.get('password') }
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  const res = await normalRequest<LoginProp>(CONST.AUTH.MANUAL_LOGIN, data, 'post', false, header)
  if (res.status && res.data?.access_token && !res.data.two_factor_enabled) {
    cookies().set(CONST.ACCESS_TOKEN, res.data.access_token)
    redirect(CONST.LOCATION.CLIENT_AREA)
  }
  return res
}

export const handleRegisterForm = async (_: any, e: FormData): Promise<ResponseProp<LoginProp | null>> => {
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  const data = { first_name: e.get('first_name'), last_name: e.get('last_name'), email: e.get('email'), password: e.get('password') }
  return await normalRequest(CONST.AUTH.MANUAL_REGISTER, data, 'post', false, header)
}

export const newTeamRegister = async ({ data: { reference, token } }: ResponseProp<{
  reference: string
  token: string
}>, e: FormData): Promise<ResponseProp> => {
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  const data = { password: e.get('password'), reference, token }

  return await normalRequest(CONST.AUTH.MANUAL_REGISTER_VERIFY, data, 'post', false, header)
}

export const auth2faVerify = async (data: { token?: string, two_factor_type?: 'app' | 'sms' | 'mail', reference?: string }, navigate = false): Promise<ResponseProp<LoginProp | null>> => {
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  const res = await normalRequest<LoginProp>(CONST.AUTH.TWO_FACTOR_VERIFY, data, 'post', false, header)
  if (navigate) {
    if (res.status && res.data?.access_token) {
      cookies().set(CONST.ACCESS_TOKEN, res.data.access_token)
      redirect(CONST.LOCATION.CLIENT_AREA)
    }
  }
  return res
}

export const Encrypt = (str: string): string => {
  try {
    const algorithm = 'aes-256-cbc';
    const key = createHash('sha512').update(process.env.SWAYAUTH_IDENTITY as string, 'utf-8').digest('hex').substring(0, 32);
    const iv = createHash('sha512').update(process.env.SWAYAUTH_IDENTITY as string, 'utf-8').digest('hex').substring(0, 16);
    var encryptor = createCipheriv(algorithm, key, iv);
    var aes_encrypted = encryptor.update(str, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer.from(aes_encrypted).toString('base64').replaceAll('=', '_');
  } catch (error: any) {
    return ''
  }
}

export const googleAuth = async () => {
  const client_id = Encrypt(JSON.stringify({ url: CONST.CLIENT_BASE_URL, duration: Date.now() + (1000 * 60 * 5) }));
  redirect(CONST.AUTH.GOOGLE + client_id);
}

export const uploadServerImage = async (base64String: string): Promise<ResponseProp<{ path: string } | null>> => {
  const header = {
    "x-api-key": process.env.SWAYAUTH_IDENTITY
  }
  const base64Res = await fetch(base64String);
  const file = await base64Res.blob();
  return await formRequest(CONST.UPLOAD.IMAGE, { file }, null, 'post', header);
}