const developer = {
  worker() {
    console.log('working...');
  },
};

developer.worker();
// developer.sleep();//'{ worker(): void; }' 형식에 'sleep' 속성이 없습니다.ts(2339)
