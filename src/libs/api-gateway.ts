import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>>;

const defaultHeader = {
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE,PATCH',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
};

export const sendResponse = (response: Record<string, unknown>, statusCode = 200, headers: object = {}) => ({
  statusCode,
  headers: { ...defaultHeader, ...headers },
  body: JSON.stringify(response),
});
