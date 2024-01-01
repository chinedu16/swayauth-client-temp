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