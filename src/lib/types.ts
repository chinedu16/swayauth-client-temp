export interface LoginProp {
  two_factor_enabled: boolean,
  reference?: string,
  access_token?: string
  refresh_token?: string
  two_factor_type?: string,
}

export interface TwoFactor {
  open: boolean,
  reference?: string,
  token?: string,
}