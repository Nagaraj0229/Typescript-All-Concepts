import { middyfy } from "@libs/lambda";
import { logger } from "src/infrastructures/utils/logger.util";
import { userValidator } from "./validators/user";
import { helloWorld } from "src/services/hello";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";

const hello:
  | ValidatedEventAPIGatewayProxyEvent<typeof userValidator>
  | any = async (event: any) => {
  logger.info("get userName");
  const userName = await helloWorld(event?.body);
  return { data: userName };
};

export const createUser = middyfy(hello);
