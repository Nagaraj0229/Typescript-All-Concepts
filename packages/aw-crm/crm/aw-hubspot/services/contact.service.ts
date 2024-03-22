import { Client } from '@hubspot/api-client';
import { ContactService } from '../../../interfaces/crmServices';
import {
  CollectionResponseWithTotalSimplePublicObjectForwardPaging,
  FilterOperatorEnum,
  PublicAssociationsForObject,
  SimplePublicObjectInput,
  SimplePublicObjectInputForCreate,
} from '@hubspot/api-client/lib/codegen/crm/contacts';
import { defaultPagingResults } from '../constants/paging';
import { PagingType } from '../types/responseType';
import { logger } from '@aw/logger';

/** For More Info Contacts: https://developers.hubspot.com/docs/api/crm/contacts */
export class Contact implements ContactService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async get<O>(
    id: string,
    properties: string[] = undefined,
    associations: string[] = undefined,
    archived: boolean = undefined
  ): Promise<O | undefined> {
    try {
      const response = await this.client.crm.contacts.basicApi.getById(
        id,
        properties,
        undefined,
        associations,
        archived,
        undefined
      );
      return { ...response, id: response.id } as O;
    } catch (e) {
      logger.info('get contact detail', e?.message);
      return;
    }
  }

  async getAll<O>(
    limit: number = 100,
    after?: string,
    properties: string[] = [],
    associations: string[] = []
  ): Promise<PagingType<O>> {
    try {
      return (await this.client.crm.contacts.basicApi.getPage(
        limit,
        after,
        properties,
        [],
        associations
      )) as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  async create<O>(
    properties: { [key: string]: string },
    associations: PublicAssociationsForObject[]
  ): Promise<O | undefined> {
    const createRequest: SimplePublicObjectInputForCreate = {
      associations,
      properties: properties,
    };
    try {
      const response = await this.client.crm.contacts.basicApi.create(createRequest);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async update<O>(
    id: string,
    properties: { [key: string]: string },
    idProperty?: string | undefined
  ): Promise<O | undefined> {
    const updateRequest: SimplePublicObjectInput = {
      properties: properties,
    };
    try {
      const response = await this.client.crm.contacts.basicApi.update(id, updateRequest, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.client.crm.contacts.basicApi.archive(id);
    } catch (e) {
      return;
    }
  }

  async search(email: string): Promise<CollectionResponseWithTotalSimplePublicObjectForwardPaging> {
    logger.info('email', email);
    try {
      const response = await this.client.crm.contacts.searchApi.doSearch({
        after: undefined,
        limit: 10,
        properties: ['hubspot_owner_id'],
        sorts: [],
        filterGroups: [{ filters: [{ propertyName: 'email', value: email, operator: FilterOperatorEnum.Eq }] }],
      });
      return response;
    } catch (e) {
      logger.info('error message', e);
      return;
    }
  }
}
