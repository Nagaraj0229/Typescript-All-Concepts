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
  accessToken?: string;
  access_token?: string;
  expiresIn?: number;
  expires_in?: number;
  refreshToken?: string;
  refresh_token?: string;
  tokenType?: string;
  token?: string;
  user?: string;
  hubDomain?: string;
  scopes?: Array<string>;
  scopeToScopeGroupPks?: Array<number>;
  trialScopes?: Array<string>;
  trialScopeToScopeGroupPks?: Array<number>;
  hubId?: number;
  appId?: number;
  userId?: number;
}
