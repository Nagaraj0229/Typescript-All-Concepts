/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefreshTokenRequest, RefreshTokenResponse } from '../api/interfaces/auth';

export interface AuthService {
  token(tokenRequest: RefreshTokenRequest): Promise<RefreshTokenResponse | undefined>;
}

export interface CalendlyService {
  getScheduledEventsList(organization: string): Promise<any>;
}
