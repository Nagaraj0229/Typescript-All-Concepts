/* eslint-disable no-unused-vars */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadRequest = 400,
}

const headers: Readonly<Record<string, string | boolean>> = {
  "Content-Type": "application/x-www-form-urlencoded, application/json; charset=utf-8",
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance ?? this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: "https://api.hubapi.com/",
      headers,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        return {
          statusCode: status,
          error: error?.data,
        };
      }
      case StatusCode.Forbidden: {
        return {
          statusCode: status,
          error: error?.data,
        };
      }
      case StatusCode.Unauthorized: {
        return {
          statusCode: status,
          error: error?.data,
        };
      }
      case StatusCode.TooManyRequests: {
        return {
          statusCode: status,
          error: error?.data,
        };
      }
      case StatusCode.BadRequest: {
        return {
          statusCode: status,
          error: error?.data,
        };
      }
    }

    return Promise.reject(error);
  }
}

export const httpClient = new Http();
