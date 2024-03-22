import { userType } from "@infrastructures/types/user";

export const helloWorld = async (event: userType): Promise<string> => {
  const userData = {
    name: event?.name,
  };
  const result = `${JSON.stringify(userData)}`;
  return result;
};
