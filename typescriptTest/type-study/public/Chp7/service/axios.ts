import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

const defaultConfig = {
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};
const apiRequester: AxiosInstance = axios.create(defaultConfig);

const orderApiRequester: AxiosInstance = axios.create({
  ...defaultConfig,
  baseURL: 'https://api.baemin.or/',
});

const orderCartApiRequester: AxiosInstance = axios.create({
  ...defaultConfig,
  baseURL: 'https://api.baemin.order/',
});

const setRequestDefaultHeader = (requestConfig) => {
  const config = { ...requestConfig };

  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
    user: '유저토큰',
  };

  return config;
};

apiRequester.interceptors.request.use(setRequestDefaultHeader);

//interceptors로 header에 설정
// apiRequester.interceptors.request.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

type HTTPHeaders = Record<string, string>;

class API {
  readonly method: HTTPMethod;
  readonly url: string;
  baseURL?: string;
  headers?: HTTPHeaders;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;

  constructor(method: HTTPMethod, url: string) {
    this.method = method;
    this.url = url;
  }

  call<T>(): AxiosPromise<T> {
    const http = axios.create();

    if (this.withCredentials) {
      http.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            //에러처리
          }
          return Promise.reject(error);
        }
      );
    }
    return http.request({ ...this });
  }
}

class APIBuilder {
  private _instance: API;

  constructor(method: HTTPMethod, url: string, data?: unknown) {
    this._instance = new API(method, url);
    this._instance.baseURL = 'hostURL';
    this._instance.data = data;
    this._instance.headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    this._instance.timeout = 5000;
    this._instance.withCredentials = false;
  }

  static get = (url: string) => new APIBuilder('GET', url);
  static put = (url: string, data: unknown) => new APIBuilder('PUT', url, data);
  static post = (url: string, data: unknown) =>
    new APIBuilder('POST', url, data);
  static delete = (url: string) => new APIBuilder('DELETE', url);

  baseURL(value: string): APIBuilder {
    this._instance.baseURL = value;
    return this;
  }

  headers(value: HTTPHeaders): APIBuilder {
    this._instance.headers = value;
    return this;
  }

  //...
}
