/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Auth } from './services/auth.service';
import { CalendlyService } from '../interfaces/service';
import { Calendly } from './services/calendly.service';

export class CalendlyAPI {
  private _authService: Auth;
  private _calendlyService: CalendlyService;

  auth(): Auth {
    this._authService = new Auth();
    return this._authService;
  }

  calendly(token: string): CalendlyService {
    this._calendlyService = new Calendly(token);
    return this._calendlyService;
  }
}
