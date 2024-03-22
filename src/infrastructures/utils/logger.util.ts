import { Logger } from "@aws-lambda-powertools/logger";

const loggerConfiguration = { serviceName: process.env.SERVICE_NAME };

export const logger = new Logger(loggerConfiguration);
