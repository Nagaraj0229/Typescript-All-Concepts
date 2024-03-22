import { AuthService, GoogleCalendarService } from './service';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Provider {
  auth(): AuthService;
  googleCalendar(): GoogleCalendarService;
}
