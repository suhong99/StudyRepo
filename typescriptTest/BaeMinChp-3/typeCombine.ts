//교차 타입

type ProductItem = {
  id: number;
  name: string;
  type: string;
  price: number;
};

type ProductItemWithDiscount = ProductItem & { discountAmount: number };

const item: ProductItem = { id: 1, name: '굽네', type: '치킨', price: 20000 };

const disItem: ProductItemWithDiscount = {
  id: 1,
  name: '굽네',
  type: '치킨',
  price: 20000,
  discountAmount: 500,
};

type CardItem = {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
};

type PromotionEventItem = ProductItem | CardItem;

const printPromotionItem = (item: PromotionEventItem) => {
  console.log(item.name);
  //   console.log(item.quantity);// 컴파일에러
};

interface IndexSignatureEx2 {
  [key: string]: number | boolean;
  length: number;
  isValid: boolean;
  // name: string;//에러
}

type Example = {
  a: number;
  b: string;
  c: boolean;
};

type IndexedAccess = Example['a'];
type IndexedAccess2 = Example['a' | 'b'];
type IndexedAccess3 = Example[keyof Example];

const indexedConst: IndexedAccess = 3;
const indexedConst2: IndexedAccess2 = 3;
const indexedConst2n1: IndexedAccess2 = '3';
const indexedKeyOf1: IndexedAccess3 = '3';
const indexedKeyOf2: IndexedAccess3 = 3;
const indexedKeyOf3: IndexedAccess3 = false;

const PromotionList = [
  { type: 'product', name: 'chicken' },
  { type: 'product', name: 'pizza' },
  { type: 'card', name: 'cheer-up' },
];

const PromotionList2 = [
  { type: 'product', name: 'chicken' },
  { type: 'product', name: 'pizza' },
  { type: 3, name: 'cheer-up' },
];

type ElementOf = (typeof PromotionList)[number];
const promotionData: ElementOf = { type: 'product', name: 'chicken' };
type ElementOf2 = (typeof PromotionList2)[number]; //type ElementOf2 = {  type: string; name: string;} | { type: number; name: string;}

type MapExample = {
  a: number;
  b: string;
  c: boolean;
};

type Subset<T> = {
  [K in keyof T]?: T[K];
};
type UnOptionalSubset<T> = {
  [K in keyof T]: T[K];
};

const aExample: Subset<MapExample> = { a: 3 };
const aExample2: Subset<MapExample> = { b: 'string' };
const aExample3: Subset<MapExample> = { a: 3, b: 'string' };
// const aExample4: UnOptionalSubset<MapExample> = { a: 3, b: 'string' }; //'c' 속성이 '{ a: number; b: string; }' 형식에 없지만 'UnOptionalSubset<MapExample>' 형식에서 필수입니다.ts(2741)

type ReadOnlyEx = {
  readonly a: number;
  readonly b: string;
};

type CreateMuatable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type ResultType = CreateMuatable<ReadOnlyEx>; //{ a: number; b: string;}

type Stage = 'init' | 'select-image';
type StageName = `${Stage}-stage`; //"init-stage" | "select-image-stage"

type ExampleArrayType<T> = T[];
const array1: ExampleArrayType<string> = ['피자', '치킨'];

function exampleFunc<T>(arg: T): T[] {
  return new Array(3).fill(arg);
}

function exampleFunc2<T>(arg: T): number {
  return arg.length; // 에러가 생김 'T' 형식에 'length' 속성이 없습니다
}

const arrowExampleFunc2 = <T extends {}>(arg: T): T[] => {
  return new Array(3).fill(arg);
};

interface useSelectPaginationProps<T> {
  categoryAtom: RecoilState<number>;
  filterAtom: RecoilState<string[]>;
  sortAtom: RecoilState<SortType>;
  fetcherFunc: (
    props: CommonListRequest
  ) => Promis<DefaultResponse<ContentListResponse<T>>>;
}
