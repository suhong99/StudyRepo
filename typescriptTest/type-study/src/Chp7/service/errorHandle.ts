// import axios, { Axios, AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

// interface ErrorResponse {
//   status: string;
//   serverDateTime: string;
//   errorCode: string;
//   errorMessage: string;
// }

// function isServerError(error: unknown): error is AxiosError<ErrorResponse> {
//   return axios.isAxiosError(error);
// }

// //subclassing

// class OrderHttpError extends Error {
//   private readonly privateResponse: AxiosResponse<ErrorResponse> | undefined;

//   constructor(message?: string, response?: AxiosResponse<ErrorResponse>) {
//     super(message);
//     this.name = 'OrderHttpError';
//     this.privateResponse = response;
//   }

//   get response(): AxiosResponse<ErrorResponse> | undefined {
//     return this.privateResponse;
//   }
// }

// class NetworkError extends Error {
//   constructor(message = '') {
//     super(message);
//     this.name = 'NetworkError';
//   }
// }

// class UnauthorizedError extends Error {
//   constructor(message: string, response?: AxiosResponse<ErrorResponse>) {
//     super(message);
//     this.name = 'UnauthorizedError';
//   }
// }

// const httpErrorHandler = (
//   error: AxiosError<ErrorResponse> | Error
// ): Promise<Error> => {
//   let promiseError: Promise<Error>;

//   if (axios.isAxiosError(error)) {
//     if (Object.is(error.code, 'ECONNABORTED')) {
//       promiseError = Promise.reject(new TimeoutError());
//     } else if (Object.is(error.code, 'Network Error')) {
//       promiseError = Promise.reject(new NetworError());
//     } else {
//       const { response } = error as AxiosError<ErrorResponse>;

//       switch (response?.status) {
//         case HttpStatusCode.Unauthorized:
//           promiseError = Promise.reject(
//             new UnauthorizedError(response?.data.errorMessage, response)
//           );
//           break;
//         default:
//           promiseError = Promise.reject(
//             new OrderHttpError(response?.data.errorMessage, response)
//           );
//       }
//     }
//   } else {
//     promiseError = Promise.reject(error);
//   }
//   return promiseError;
// };
// type AlertPopup = {
//   type: string;
//   message: string;
//   // 다른 프로퍼티들...
// };

// const onUnauthorizedError = (message: string, callback?: () => void) => {
//   console.error(`Unauthorized Error: ${message}`);
//   if (callback) {
//     callback();
//   }
// };
// const onActionError = (
//   error: unknown,
//   params?: Omit<AlertPopup, 'type' | 'message'>
// ) => {
//   if (error instanceof UnauthorizedError) {
//     onUnauthorizedError(error.message);
//   } else if (error instanceof NetworkError) {
//     // ...
//     alert('내트워크 연결이 이상합니다.');
//   }
// };

// const httpErrorHanlder = (
//   error: AxiosError<ErrorResponse> | Error
// ): Promise<Error> => {
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = `${backofficeAuthHost}`;
//     }
//     return Promise.reject(error);
//   };
// };

// orderApiRequester.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   httpErrorHandler
// );

export {};
