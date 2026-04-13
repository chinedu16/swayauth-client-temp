export const CONST = Object.freeze({
  BASE_URL: process.env.NEXT_PUBLIC_SWAYAUTH_API_BASE_URL || (process.env.NODE_ENV == 'development' ? `http://${typeof window !== "undefined" ? window?.location?.hostname : 'localhost'}:8000/v1` : 'https://swayauth-backend.onrender.com/v1'),
  CLIENT_BASE_URL: process.env.NODE_ENV == 'development' ? `http://${typeof window !== "undefined" ? window?.location?.hostname : 'localhost'}:3000` : 'https://swayauth-client.netlify.app',
  AUTH_BASE_URL: process.env.NEXT_PUBLIC_SWAYAUTH_AUTH_BASE_URL || (process.env.NODE_ENV == 'development' ? `http://${typeof window !== "undefined" ? window?.location?.hostname : 'localhost'}:3000` : 'https://swayauth-client.netlify.app'),
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
  NEWSLETTER: {
    JOIN: '/subscription/newsletter'
  },
  BLOG: {
    LIST: '/blog',
    GET_ONE: '/blog',
    COUNT: '/blog/count'
  },
  AUTH: {
    FORGOT_PASSWORD: '/auth/forgot-password/client',
    NEW_PASSWORD: '/auth/forgot-password/new-password',
    MANUAL_LOGIN: '/auth/login/client',
    GET_TWO_FA: '/auth/2fa/list',
    MANUAL_REGISTER: '/auth/register/client',
    MANUAL_REGISTER_VERIFY: '/auth/register/verify',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify',
    TOKEN_VERIFY: '/auth/token/verify',
    TWO_FACTOR_ENABLE: '/auth/2fa/enable',
    GOOGLE: process.env.NODE_ENV == 'development' ?
      'http://localhost:8000/v1/auth/google?client_id=' :
      'https://swayauth-backend.onrender.com/v1/auth/google?client_id=',
    FACEBOOK: process.env.NODE_ENV == 'development' ?
      'http://localhost:8000/v1/auth/facebook?client_id=' :
      'https://swayauth-backend.onrender.com/v1/auth/facebook?client_id='
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
      DELETE: '/client/mail/delete',
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
    SUBSCRIPTION: {
      GET: '/subscription',
      UPGRADE: '/subscription/upgrade'
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
