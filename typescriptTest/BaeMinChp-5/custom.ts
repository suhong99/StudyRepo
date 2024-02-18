type CustomCard = {
  type: 'card';
  card: string;
};

type CustomAccount = {
  type: 'account';
  account: string;
};

function withdraw(type: CustomCard | CustomAccount) {
  //...
}

withdraw({ type: 'card', card: 'hyundai' });

type CustomEx1 =
  | { account: string; card?: undefined }
  | { card: string; account?: undefined };

type exCard = { card: string };

type PickOne<T> = {
  [P in keyof T]: Record<P, T[P]> &
    Partial<Record<Exclude<keyof T, P>, undefined>>;
}[keyof T];

type One<T> = { [P in keyof T]: Record<P, T[P]> }[keyof T];
const one: One<exCard> = { card: 'hyunadi' };

type ExcludeOne<T> = {
  [P in keyof T]: Partial<Record<Exclude<keyof T, P>, undefined>>;
}[keyof T];

type PickOne2<T> = One<T> & ExcludeOne<T>;

type PickOneCard = {
  card: string;
  test: string;
};

type PickOneAccount = {
  account: string;
};

type CardOrAccount = PickOne<PickOneCard & PickOneAccount>;

function withdrawPick(type: CardOrAccount) {
  //. .
}

withdrawPick({ card: 'hyundaii' });
// withdrawPick({ card: 'hyundaii', account: 'test' });// error

// type NonNullable<T> = T extends null | undefined ? never : T;

function NonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

interface ColorType {
  red: string;
  green: string;
  blue: string;
}

type ColorKeyType = keyof ColorType; // "red"|"?green"|"blue"

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#F45452',
  green: '#0C952A',
  blue: '#1A7CFF',
};

type ColorsType = typeof colors; //{black: string; white: string; red: string; green: string;blue: string;}

const theme = {
  colors: {
    default: colors.black,
    ...colors,
  },
  backgroundColor: {
    default: colors.white,
    red: colors.red,
    green: colors.green,
    black: colors.black,
  },
};

type ColorType2 = keyof typeof theme.colors; //"black" | "white" | "red" | "green" | "blue" | "default"

type FoodCategory = string;
interface Food {
  name: string;
}

const foodByCategory: Record<FoodCategory, Food[]> = {
  한식: [{ name: '제육' }, { name: '뚝불' }],
  일식: [{ name: '초밥' }, { name: '텐동' }],
};

foodByCategory['양식']; //Food[] 로 추론

foodByCategory['양식'].map((food) => console.log(food.name));
foodByCategory['양식']?.map((food) => console.log(food.name));

type UnitTypeCategory = '한식' | '일식';

// type FoodCategory = string;

type PartialRecord<K extends string, T> = Partial<Record<K, T>>;

interface Food2 {
  name: string;
}

const foodByCategory2: PartialRecord<FoodCategory, Food[]> = {
  한식: [{ name: '제육' }, { name: '뚝불' }],
  일식: [{ name: '초밥' }, { name: '텐동' }],
};

foodByCategory2['양식'].map((food) => console.log(food.name));
