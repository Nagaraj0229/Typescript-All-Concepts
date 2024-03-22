/* eslint-disable @typescript-eslint/ban-types */
export type CalendersListResponse = {
  data: Array<CalendarsCommonType>;
};

export type CalendarEventsListResponse = Array<CalendarsCommonType>;

export type CalendarsCommonType = {
  kind?: string;
  etag?: string;
  id?: string;
  summary?: string;
  description?: string;
  timeZone?: string;
  colorId?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  selected?: boolean;
  accessRole?: string;
  defaultReminders?: [];
  conferenceProperties?: {
    allowedConferenceSolutionTypes?: Array<string>;
  };
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  creator?: { email: string };
  organizer?: { email: string };
  start?: { dateTime: string; timeZone: string };
  end?: { dateTime: string; timeZone: string };
  iCalUID?: string;
  sequence?: number;
  attendees?: [[{}]];
  hangoutLink?: string;
  conferenceData?: {
    entryPoints: [[]];
    conferenceSolution: [{}];
    conferenceId: string;
  };
  reminders?: {
    useDefault: boolean;
  };
  source?: {
    url: string;
    title: string;
  };
  eventType?: string;
};
