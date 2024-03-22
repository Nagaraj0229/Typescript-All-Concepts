/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@aw/axios';
import { env } from '@aw/env';
import { GoogleCalendarService } from '../../interfaces/service';
import { LoggerService } from '@aw/logger';
import { CalendarEventsListResponse, CalendersListResponse } from '@aw/google/api/types/calenders';
import { GoogleCalendarEventBuilderType } from 'src/infrastructures/types';

/** For More Info GoogleCalender: https://developers.google.com/calendar/api/v3/reference/calendarList/list */
export class GoogleCalendar implements GoogleCalendarService {
  private logger = new LoggerService({ serviceName: GoogleCalendar.name });

  constructor(token: string) {
    axiosClient.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  public getCalendarsList = async (): Promise<CalendersListResponse> => {
    const url = env('googleCalendarBaseUrl') as string;
    const response = await axiosClient.get(`${url}/users/me/calendarList`);
    this.logger.info('Calenders list api response', response?.data);
    return response.data.items;
  };

  public getCalendarsEventsList = async (calendarId: string): Promise<CalendarEventsListResponse> => {
    const url = env('googleCalendarBaseUrl') as string;
    const response = await axiosClient.get(`${url}/calendars/${calendarId}/events`);
    this.logger.info('Calenders event list api response', response?.data);
    return response.data;
  };

  public createCalenderEvent = async (event: GoogleCalendarEventBuilderType, calendarId: string): Promise<any> => {
    const url = env('googleCalendarBaseUrl') as string;
    const response = await axiosClient.post(
      `${url}/calendars/${calendarId}/events?sendNotifications=true&sendUpdates=all`,
      event
    );

    this.logger.info('Create calendar event', { response });
    return response?.data;
  };

  public modifyCalenderEvent = async (
    event: GoogleCalendarEventBuilderType,
    calendarId: string,
    eventId: string
  ): Promise<any> => {
    const url = env('googleCalendarBaseUrl') as string;
    const response = await axiosClient.put(
      `${url}/calendars/${calendarId}/events/${eventId}?sendNotifications=true&sendUpdates=all`,
      event
    );
    this.logger.info('modify calendar event', { response });

    return response?.data;
  };

  public deleteCalenderEvent = async (calendarId: string, eventId: string): Promise<any> => {
    const url = env('googleCalendarBaseUrl') as string;
    const response = await axiosClient.delete(
      `${url}/calendars/${calendarId}/events/${eventId}?sendNotifications=true&sendUpdates=all`
    );
    this.logger.info('delete   calendar event', { response });

    return response?.data;
  };

  public getEvent = async (calenderId?: string, eventId?: string): Promise<any> => {
    const url = env('googleCalendarBaseUrl') as string;
    const response = await axiosClient.get(`${url}/calendars/${calenderId}/events/${eventId}`);
    this.logger.info('get event by id response', { response });
    return response?.data;
  };
}
