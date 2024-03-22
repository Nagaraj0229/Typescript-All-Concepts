import { Provider } from './interfaces/provider';
import { AuthService, GoogleCalendarService } from './interfaces/service';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BaseProvider implements Provider {
  abstract auth(): AuthService;
  abstract googleCalendar(): GoogleCalendarService;
}
