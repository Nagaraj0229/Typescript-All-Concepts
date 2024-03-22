/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@hubspot/api-client';
import { defaultPagingResults } from '../constants/paging';
import { MeetingService } from '../../../interfaces/crmServices';
import { PagingType } from '../types/responseType';
import {
  SimplePublicObject,
  SimplePublicObjectInput,
  SimplePublicObjectInputForCreate,
} from '@hubspot/api-client/lib/codegen/crm/contacts';
import { AppError } from '@libs/api-error';
import { httpStatusCode } from 'src/infrastructures/enum/httpResponseStatus';

/** For More info Meetings: https://developers.hubspot.com/docs/api/crm/meetings */
export class Meeting implements MeetingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getAll<O>(
    limit: number,
    after: string,
    properties: string[] | [] = undefined,
    propertiesWithHistory: string[] | [] = undefined,
    associations: string[] | [] = undefined,
    archived: boolean
  ): Promise<PagingType<O>> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.getPage(
        limit,
        after,
        properties,
        propertiesWithHistory,
        associations,
        archived
      );
      return response as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  public async get<O>(
    id: string,
    properties: string[],
    propertiesWithHistory: string[] | undefined = undefined,
    associations: string[],
    idProperty: string | undefined = undefined
  ): Promise<O | undefined> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.getById(
        id,
        properties,
        propertiesWithHistory,
        associations,
        false,
        idProperty
      );
      return response as O;
    } catch (e) {
      throw new AppError(e?.message, httpStatusCode.BAD_REQUEST);
    }
  }

  public async delete(id: string): Promise<void | undefined> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.archive(id);
      return response;
    } catch (e) {
      throw new AppError(e?.message, httpStatusCode.BAD_REQUEST);
    }
  }

  public async update(id: string, properties: SimplePublicObjectInput): Promise<SimplePublicObject | undefined> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.update(id, properties);
      return response;
    } catch (e) {
      throw new AppError(e?.message, httpStatusCode.BAD_REQUEST);
    }
  }

  public async create(data: SimplePublicObjectInputForCreate): Promise<SimplePublicObject | undefined> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.create({
        associations: data.associations,
        properties: data.properties,
      });
      return response as SimplePublicObject;
    } catch (e) {
      new AppError(e.message, httpStatusCode.BAD_REQUEST);
      return null;
    }
  }
}
