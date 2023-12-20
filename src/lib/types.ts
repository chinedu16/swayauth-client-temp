export interface LoginProp {
  two_factor_enabled: boolean,
  reference?: string,
  two_factor_type?: string,
}

export interface TwoFactor {
  open: boolean,
  reference?: string,
  token?: string,
}