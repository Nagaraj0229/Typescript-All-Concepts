/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleCalendarEventBuilderType } from 'src/infrastructures/types';
import { RefreshTokenRequest, RefreshTokenResponse } from '../api/interfaces/auth';

export interface AuthService {
  token(tokenRequest: RefreshTokenRequest): Promise<RefreshTokenResponse | undefined>;
}

export interface GoogleCalendarService {
  getCalendarsList(event: string): Promise<string | any>;
  getCalendarsEventsList(event: string, calendarId: string): Promise<any>;
  createCalenderEvent(event: GoogleCalendarEventBuilderType, calendarId: string): Promise<any>;
  modifyCalenderEvent(event: GoogleCalendarEventBuilderType, calendarId: string, eventId: string): Promise<any>;
  deleteCalenderEvent(calendarId: string, eventId: string): Promise<any>;
}
