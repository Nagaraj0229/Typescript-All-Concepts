import { Client } from '@hubspot/api-client';
import { AuthService } from '../../../interfaces/crmServices';
import { RefreshTokenRequest, RefreshTokenResponse } from '../interfaces/auth';
import { logger } from '@aw/logger';

/** For More info Tokens: https://developers.hubspot.com/docs/api/oauth/tokens */
export class Auth implements AuthService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async token(tokenRequest: RefreshTokenRequest): Promise<RefreshTokenResponse | undefined> {
    try {
      const response = (await this.client.oauth.tokensApi.create(
        tokenRequest.grant_type,
        tokenRequest?.code,
        tokenRequest?.redirect_uri,
        tokenRequest?.client_id,
        tokenRequest?.client_secret,
        tokenRequest?.refresh_token
      )) as RefreshTokenResponse;
      return response;
    } catch (e) {
      logger.error(e?.message);
      return;
    }
  }

  async tokenInfo(token: string): Promise<RefreshTokenResponse | undefined> {
    try {
      return (await this.client.oauth.accessTokensApi.get(token)) as RefreshTokenResponse;
    } catch (e) {
      return;
    }
  }
}
