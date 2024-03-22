/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@aw/axios';
import { AxiosResponse } from 'axios';
import { env } from '@aw/env';
import { RefreshTokenRequest, RefreshTokenResponse } from '../interfaces/auth';
import { AuthService } from '../../interfaces/service';

/** For More info Tokens: https://developers.hubspot.com/docs/api/oauth/tokens */
export class Auth implements AuthService {
  public token = async (tokenRequest: RefreshTokenRequest): Promise<RefreshTokenResponse | undefined> => {
    const url = env('googleCalenderAuthUrl') as string;
    try {
      const response: AxiosResponse<any> = await axiosClient.post(url, new URLSearchParams(tokenRequest as any), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      });
      return response?.data as RefreshTokenResponse;
    } catch (e) {
      return;
    }
  };
}
