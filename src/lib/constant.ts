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
    GET_TWO_FA: '/auth/2fa',
    MANUAL_REGISTER: '/auth/register/client',
    MANUAL_REGISTER_VERIFY: '/auth/register/verify',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify',
    TOKEN_VERIFY: '/auth/token/verify',
    TWO_FACTOR_ENABLE: '/auth/2fa/enable',
  },
  ACCOUNT: {
    PHOTO: '/account/photo',
    GET_PROFILE: '/account',
    UPDATE_ACCOUNT: '/account',
    UPDATE_PASSWORD: '/account/password',
    SWITCH_ACCOUNT: '/account/switch',
    GET_ASSOCIATION: '/account/association',
  },
  COMPANY: {
    STATISTICS: {
      GET_STATISTIC_PERFORMANCE: '/company/statistics/count',
      GET_ALL_STATISTIC_PERFORMANCE: '/company/statistics/count?users&sms&mail&google&facebook&manual&duration=7_days',
      GET_REGISTER_GRAPH: '/company/statistics/registered',
      GET_LOGIN_GRAPH: '/company/statistics/login',
    },
    SMTP: {
      DETAIL: '/company/mail',
      LOGO: '/company/mail/photo',
      SETUP: '/company/mail/setup',
      UPDATE: '/company/mail/update',
      VERIFY: '/company/mail/verify',
    },
    USERS: {
      STATISTICS: '/company/users/statistics?users&organizations&active&disabled',
      DELETE_USERS: '/company/users/delete',
      ACTIVATE_USERS: '/company/users/activate',
      DEACTIVATE_USERS: '/company/users/deactivate',
      LIST: '/company/users'
    },
    TEAM: {
      LIST: '/company/team',
      CREATE: '/company/team/create'
    },
    ORGANIZATION: {
      LIST: '/company/organizations',
      DELETE: '/company/organizations',
    },
    CREDENTIALS: {
      GET_APP_KEY: '/company/credentials/appkey',
      ROTATE_APP_KEY: '/company/credentials/appkey/rotate'
    },
    WALLET: {
      GET_WALLET: '/company/wallet/balance',
    }
  }
})