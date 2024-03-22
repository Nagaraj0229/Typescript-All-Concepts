import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { sendResponse } from "@libs/api-gateway";
import { AppError } from "@libs/api-error";
import MiddlewareFunction = middy.MiddlewareFn;
import { logger } from "@infrastructures/utils/logger.util";

export const apiGatewayResponseMiddleware = (
  options: { enableErrorLogger?: boolean } = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (
    request
  ) => {
    if (
      !request.event?.httpMethod ||
      request.response === undefined ||
      request.response === null
    ) {
      return;
    }

    const existingKeys = Object.keys(request.response);
    const isHttpResponse =
      existingKeys.includes("statusCode") &&
      existingKeys.includes("headers") &&
      existingKeys.includes("body");

    if (isHttpResponse) {
      return;
    }

    request.response = sendResponse(request.response);
  };

  const onError: MiddlewareFunction<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const { error } = request;
    let statusCode = 500;

    if (error instanceof AppError) {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      statusCode = error.statusCode;
    }

    if (options.enableErrorLogger) {
      logger.error(error?.message);
    }

    request.response = sendResponse({ message: error.message });
  };

  return {
    after,
    onError,
  };
};
