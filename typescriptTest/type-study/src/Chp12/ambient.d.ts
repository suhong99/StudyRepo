declare module '*.png' {
  const src: string;
  export default src;
}

declare global {
  interface Window {
    deviceId: string | undefined;
    appVersion: string;
  }
}

type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

declare type Nullable<T> = T | null;

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_URL: string;
    readonly API_INTERNAL_URL: string;
  }
}
