enum Language {
  Typescript, //0
  Javascript, //1
  Java, //2
  Python = 'Python',
  Kotlin = 300,
  Rust, //301
}

enum ItemStatusType {
  HOLd = 'HOLD', //배송보류
  READY = 'READY', //배송 준비
  DELIVERING = 'DELIVERING', // 배송 중
  DELIVERED = 'DELIVERED', // 배송완료
}

const checkItemAvailable = (itemStatus: ItemStatusType) => {
  switch (itemStatus) {
    case ItemStatusType.HOLd:
    case ItemStatusType.READY:
    case ItemStatusType.DELIVERING:
      return false;
    case ItemStatusType.DELIVERED:
      defalut: return true;
  }
};

const enum NUMBER {
  ONE = 1,
  TWO = 2,
}

enum NUM {
  ONE = 1,
  TWO = 2,
  THREE,
}

const notMyNumber: NUM = 100; //'100' 형식은 'NUMBER' 형식에 할당할 수 없습니다.ts(2322)

const myNumber: NUMBER = 100; //'100' 형식은 'NUMBER' 형식에 할당할 수 없습니다.ts(2322)

const enum STRING_NUMBER {
  ONE = 'ONE',
  TWO = 'TWO',
}

const myStringNum: STRING_NUMBER = 'THREE'; //'"THREE"' 형식은 'STRING_NUMBER' 형식에 할당할 수 없습니다.ts(2322)
