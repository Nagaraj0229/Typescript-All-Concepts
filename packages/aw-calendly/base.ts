import { Provider } from './interfaces/provider';
import { AuthService, CalendlyService } from './interfaces/service';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BaseProvider implements Provider {
  abstract auth(): AuthService;
  abstract calendly(): CalendlyService;
}
