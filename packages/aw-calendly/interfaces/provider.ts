import { AuthService, CalendlyService } from './service';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Provider {
  auth(): AuthService;
  calendly(): CalendlyService;
}
