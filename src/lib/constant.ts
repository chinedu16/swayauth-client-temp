export const CONST = Object.freeze({
  BASE_URL: process.env.NODE_ENV == 'development' ? `http://${typeof window !== "undefined" ? window?.location?.hostname : '172.20.10.4'}:8000/v1` : 'https://api.swayauth.com/v1',
  ACCESS_TOKEN: '__s_c_UUtk_at',
  REFRESH_TOKEN: '__s_c_UUtk_tr',
  LOCATION: {
    CLIENT_AREA: '/clientarea',
    LOGIN: '/login',
    VERIFY: '/verify',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register'
  },
  UPLOAD: {
    IMAGE: '/upload/image'
  },
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
      GET_STATISTIC_PERFORMANCE: '/client/statistics/count',
      GET_ALL_STATISTIC_PERFORMANCE: '/client/statistics/count?users&sms&mail&google&facebook&manual&duration=7_days',
      GET_REGISTER_GRAPH: '/client/statistics/registered',
      GET_LOGIN_GRAPH: '/client/statistics/login',
    },
    SMTP: {
      DETAIL: '/client/mail',
      LOGO: '/client/mail/photo',
      SETUP: '/client/mail/setup',
      UPDATE: '/client/mail/update',
      VERIFY: '/client/mail/verify',
    },
    USERS: {
      STATISTICS: '/client/users/statistics?users&organizations&active&disabled',
      DELETE_USERS: '/client/users/delete',
      ACTIVATE_USERS: '/client/users/activate',
      DEACTIVATE_USERS: '/client/users/deactivate',
      LIST: '/client/users'
    },
    TEAM: {
      LIST: '/client/team',
      CREATE: '/client/team/create'
    },
    ORGANIZATION: {
      LIST: '/client/organizations',
      TOKEN: {
        LIST: '/client/organizations',
        DELETE: '/client/organizations/tokens',
      },
      CREATE: '/client/organizations/create',
      DELETE: '/client/organizations',
    },
    TRANSACTION: {
      LIST: '/client/transactions'
    },
    CARD: {
      LIST: '/client/cards',
      DELETE: '/client/cards/delete',
      SAVE_CARDS: '/client/cards/save-cards?status='
    },
    CREDENTIALS: {
      GET_APP_KEY: '/client/credentials/app-key',
      ROTATE_APP_KEY: '/client/credentials/app-key/rotate'
    },
    WALLET: {
      GET_WALLET: '/client/wallet/balance',
      FUND_WALLET: '/client/wallet/init-payment',
    }
  }
})