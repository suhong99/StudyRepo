type IdType = string | number;
type Numeric = number | boolean;
type Universal = IdType & Numeric; // number

interface BaseMenuItem {
  itemName: string | null;
  itemImageUrl: string | null;
}

interface BaseCartItem extends BaseMenuItem {
  quantity: number;
}

interface DelTip {
  tip: number;
}
interface Filter extends DelTip {
  tip: string;
  //'Filter' 인터페이스가 'DelTip' 인터페이스를 잘못 확장합니다.
  //'tip' 속성의 형식이 호환되지 않습니다.
}

type DelTip2 = { tip: number };
type Fliter2 = DelTip2 & { tip: string }; // never타입
