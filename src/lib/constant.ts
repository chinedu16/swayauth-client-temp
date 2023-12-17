export const CONST = Object.freeze({
  BASE_URL: process.env.NODE_ENV === 'production' ? 'https://api.swayauth.com/v1' : 'http://localhost:8000/v1',
  LOCATION: {
    CLIENT_AREA: '/clientarea',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register'
  },
  ACCESS_TOKEN: '__s_c_UUtk_at',
  REFRESH_TOKEN: '__s_c_UUtk_tr',
  AUTH: {
    MANUAL_LOGIN: '/auth/login/client',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify'
  },
  ACCOUNT: {
    GET_PROFILE: '/account',
  }
})