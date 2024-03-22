import { axiosClient } from '@aw/axios';
import { CalendlyService } from '../../interfaces/service';
import { LoggerService } from '@aw/logger';
import { env } from '@aw/env';

export class Calendly implements CalendlyService {
  private logger = new LoggerService({ serviceName: Calendly.name });

  constructor(token: string) {
    axiosClient.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  public getScheduledEventsList = async (organization: string): Promise<unknown> => {
    const url = env('calendlyBaseUrl') as string;
    const response = await axiosClient.get(`${url}/event_types?organization=${organization}`);
    this.logger.info('calendly events list api response', { response });
    return response?.data;
  };
}
