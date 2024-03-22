import { QueueType } from '../enums/queueType';

export type QueueConfigType = {
  QueueUrl: string;
  MessageDeduplicationId: string;
  MessageGroupId: string;
  Type: QueueType;
};
