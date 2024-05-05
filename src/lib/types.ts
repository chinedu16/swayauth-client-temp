export interface LoginProp {
  two_factor_enabled: boolean,
  reference?: string,
  access_token?: string
  refresh_token?: string
  two_factor_type?: 'mail-link' | 'mail-token' | 'sms' | 'app' | 'mail',
}

export interface TwoFactor {
  open: boolean,
  reference?: string,
  two_factor_type?: 'mail-link' | 'mail-token' | 'sms' | 'app' | 'mail'
  token?: string,
}

export interface SearchParamsProp {
  token?: string
  status?: 'true' | 'false'
  access_token?: string
  refresh_token?: string
  message?: string
  intent?: 'register' | 'team' | 'two-factor' | 'login' | 'forgot-password'
  as?: 'client' | 'user',
  account?: 'old' | 'new'
  email?: string
  reference?: string
}