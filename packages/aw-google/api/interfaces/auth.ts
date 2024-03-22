import { GrantType } from '../types/grantType';

export interface RefreshTokenRequest {
  grant_type?: GrantType;
  code?: string;
  redirect_uri?: string;
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type?: string;
  id_token: string;
  scope?: Array<string>;
}
