/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SchedulerClient,
  CreateScheduleCommand,
  CreateScheduleCommandInput,
  CreateScheduleCommandOutput,
  Target,
} from '@aws-sdk/client-scheduler';
import { env } from '@aw/env';
import { ScheduleType } from './types/schedule';
import { ScheduleTargetEnum } from './enums/scheduleTarget';
import { LoggerService } from '@aw/logger';

export default class EventBridgeSchedulerClient {
  private scheduler: SchedulerClient;
  public logger = new LoggerService({ serviceName: EventBridgeSchedulerClient?.name });

  constructor() {
    this.scheduler = new SchedulerClient({
      credentials: {
        accessKeyId: <string>env('accessKey'),
        secretAccessKey: <string>env('secretAccessKey'),
      },
      region: <string>env('region'),
    });
  }

  private getScheduleCommand<T>(payload: ScheduleType<T>): CreateScheduleCommandInput {
    const command: CreateScheduleCommandInput = {
      Name: payload.name,
      Description: payload.description ?? 'MyScheduleEvent',
      State: 'ENABLED',
      ScheduleExpression: `at(${payload.scheduleExpressAt})`, // Schedule expression at(yyyy-mm-ddThh:mm:ss)
      ScheduleExpressionTimezone: 'UTC',
      FlexibleTimeWindow: {
        Mode: 'OFF',
      },
      Target: {
        RoleArn: <string>env('schedulerRoleArn'), // Policy Arn
        RetryPolicy: {
          MaximumEventAgeInSeconds: 86400,
          MaximumRetryAttempts: 185,
        },
        Arn: <string>env('schedulerTargetArn'),
        Input: JSON.stringify(Object.assign(payload?.data ?? {}, { schedule: true })),
      },
      ActionAfterCompletion: payload.ActionAfterCompletion,
    };
    this.logger.info('schedule making payload', { data: command });
    if (payload.scheduleTargetType === ScheduleTargetEnum.SQS) {
      (command.Target as Target)['SqsParameters'] = {
        MessageGroupId: <string>payload?.messageGroupId,
      };
    }

    return command;
  }

  private async handlerError(_responsePayload: any): Promise<any> {
    if (!_responsePayload?.['url']) {
      return {
        url: null,
      };
    }
  }

  async scheduleEvent<T>(payload: ScheduleType<T>): Promise<CreateScheduleCommandOutput> {
    this.logger.info('Incoming scheduling payload form apps', payload);
    const scheduleCommand = this.getScheduleCommand<T>(payload);
    const command = new CreateScheduleCommand(scheduleCommand);
    const event = await this.scheduler.send(command);
    await this.handlerError(event);
    return event;
  }
}
