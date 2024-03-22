import { AxiosResponse } from "axios";
import { httpClient } from "@infrastructures/http/client.http";
import * as hubspot from "@hubspot/api-client";

export const generateAccessTokenUsingRefreshToken = async () => {
  const payload = {
    client_id: "8fdb995e-f29b-4e13-93a2-c995c9749792",
    redirect_uri: "http://localhost:8080",
    client_secret: "36c800c4-c319-4b37-9c6e-8f904f5ba76f",
    grant_type: "refresh_token",
    refresh_token: "64c6f6d5-d860-4579-b7bf-125c459f1642",
  };
  try {
    const res: AxiosResponse<{ access_token: string }> = await httpClient.post(
      "https://api.hubapi.com/oauth/v1/token",
      payload,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return new hubspot.Client({ accessToken: res?.data?.access_token });
  } catch (e) {
    console.error(e?.message);
  }
};
