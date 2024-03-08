interface Fruit {
  count: number;
}

interface Param {
  [key: string]: Fruit;
}

const func: (fruits: Param) => void = ({ apple }: Param) =>
  console.log(apple.count);

func({ apple: { count: 0 } });

func({ mango: { count: 0 } }); // apple이 아니므로 런ㅌ아ㅣㅁ 에러

export {};
