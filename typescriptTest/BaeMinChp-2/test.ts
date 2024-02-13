interface Cube {
  width: number;
  heigth: number;
  depth: number;
}

function addLines(c: Cube) {
  let total = 0;

  for (const axis of Object.keys(c)) {
    const length = c[axis];
    total += length;
  }
}

const namedCube = {
  width: 6,
  heigth: 5,
  depth: 4,
  name: 'SweetCube',
};

addLines(namedCube);

enum WeekDays {
  MON = 'Mon',
  TUES = 'Tues',
  WEDNES = 'Wednes',
  THURS = 'Thurs',
  FRI = 'Fri',
}

type WeekDaysKey = keyof typeof WeekDays;
function printDay(key: WeekDaysKey, message: string) {
  const day = WeekDays[key];
  if (day <= WeekDays.WEDNES) {
    console.log(`It's still ${day}, ${message}`);
  }
}

printDay('TUES', 'wanna go home');

enum MyColors {
  BLUE = '#0000FF',
  YELLOW = '#FFFF00',
}

function whatBlueColor(palette: { BLUE: string }) {
  return palette.BLUE;
}

whatBlueColor(MyColors);

const noticePopup: { title: string; description: string } = {
  title: 'IE 지원 종료',
  description: '2022.07부로 종료',
  //startAt : "2022.07.15" // 지정  타입에 없을므로 오류 생김
};
