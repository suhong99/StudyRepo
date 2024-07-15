// Module '"str-utils"' has no exported member 'strReverse'.

declare module 'str-utils' {
  type StrUtil = (input: string) => string;

  export const strReverse: StrUtil;
  export const strToLower: StrUtil;
  export const strToUpper: StrUtil;
  export const strRandomize: StrUtil;
  export const strInvertCase: StrUtil;
}
