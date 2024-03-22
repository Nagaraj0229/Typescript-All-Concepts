/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Auth } from './services/auth.service';
import { GoogleCalendarService } from '../interfaces/service';
import { GoogleCalendar } from './services/googleCalendar.service';

export class GoogleApi {
  private _authService: Auth;
  private _googleCalendarService: GoogleCalendarService;

  auth(): Auth {
    this._authService = new Auth();
    return this._authService;
  }

  googleCalendar(token: string): GoogleCalendar {
    this._googleCalendarService = new GoogleCalendar(token);
    return this._googleCalendarService as any;
  }
}
