import { AWSFunction } from "@libs/lambda";
import { handlerPath } from "@libs/handler-resolver";
import { userValidator } from "./validators/user";

export const main = {
  handler: `${handlerPath(__dirname)}/handler.createUser`,
  events: [
    {
      http: {
        method: "post",
        path: "dev/hello",
        request: {
          schemas: {
            "application/json": userValidator,
          },
        },
      },
    },
  ],
} as AWSFunction;
