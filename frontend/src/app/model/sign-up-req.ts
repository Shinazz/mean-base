export interface SignupReq {
  email?: string;
  password?: string;
  token?: string;
  userName?: string;
}

interface TokenResponse {
  token: string;
}
