/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@aw/env';
import { Entity } from 'dynamodb-toolbox';
import { EnableLogEnum } from './enums/log';
import { DynamoDBDocumentClient, PutCommandInput, QueryCommandOutput, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { LoggerService } from '@aw/logger';

export default class DynamoDB {
  private logger = new LoggerService({ serviceName: DynamoDBClient.name });
  private documentClient: DynamoDBDocumentClient;

  constructor() {
    const marshallOptions = {
      convertEmptyValues: false,
    };
    const translateConfig = { marshallOptions };
    this.documentClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        credentials: {
          accessKeyId: env('accessKey') as string,
          secretAccessKey: env('secretAccessKey') as string,
        },
        region: env('region') as string,
      }),
      translateConfig
    );
  }

  dynamoDBClient(): DynamoDBDocumentClient {
    return this.documentClient;
  }

  // Insert or Update the records based on the entity.
  async put<T extends object>(entity: Entity, payload: T): Promise<PutCommandInput> {
    if (env('enableLogger') !== EnableLogEnum.TRUE) return await entity.put<T>(payload);
    this.logger.info(`Put: ${entity.name}`, { payload, entityName: entity.name });
  }

  // Update the records based on the entity.
  async update<T extends object>(entity: Entity, payload: T): Promise<UpdateCommandInput> {
    if (env('enableLogger') !== EnableLogEnum.TRUE) return await entity.update<T>(payload);
    this.logger.info(`Update: ${entity.name}`, { payload, entityName: entity.name });
  }

  // Get the records based on the entity.
  async get<T extends object>(entity: Entity, payload: T): Promise<any> {
    if (env('enableLogger') !== EnableLogEnum.TRUE) return await entity.get<T>(payload);
    this.logger.info(`Get: ${entity.name}`, { payload, entityName: entity.name });
  }

  // Get the records based on the entity.
  async query<T extends object>(entity: Entity, payload: T, filters?: any): Promise<QueryCommandOutput> {
    if (env('enableLogger') !== EnableLogEnum.TRUE) return await entity.query<T>(payload?.['pk'], { ...filters });
    this.logger.info(`Query: ${entity.name}`, { payload, entityName: entity.name });
  }
}
