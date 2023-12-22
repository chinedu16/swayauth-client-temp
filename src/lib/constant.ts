export const CONST = Object.freeze({
  BASE_URL: process.env.NODE_ENV == 'development' ? `http://${typeof window !== "undefined" ? window?.location?.hostname : '172.20.10.4'}:8000/v1` : 'https://api.swayauth.com/v1',
  LOCATION: {
    CLIENT_AREA: '/clientarea',
    LOGIN: '/login',
    VERIFY: '/verify',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register'
  },
  ACCESS_TOKEN: '__s_c_UUtk_at',
  REFRESH_TOKEN: '__s_c_UUtk_tr',
  AUTH: {
    MANUAL_LOGIN: '/auth/login/client',
    MANUAL_REGISTER: '/auth/register/client',
    MANUAL_REGISTER_VERIFY: '/auth/register/verify',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify',
    TWO_FACTOR_ENABLE: '/auth/2fa/enable',
  },
  ACCOUNT: {
    GET_PROFILE: '/account',
    UPDATE_ACCOUNT: '/account',
    SWITCH_ACCOUNT: '/account/switch',
    GET_ASSOCIATION: '/account/association',
  }
})