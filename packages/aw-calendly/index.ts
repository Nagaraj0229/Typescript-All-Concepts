import { BaseProvider } from './base';
import { Provider } from './interfaces/provider';
import { AuthService, CalendlyService } from './interfaces/service';

export class Processor implements BaseProvider {
  private provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  auth(): AuthService {
    return this.provider.auth();
  }

  calendly(): CalendlyService {
    return this.provider.calendly();
  }
}
