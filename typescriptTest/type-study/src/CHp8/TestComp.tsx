import React, { ChangeEvent, useEffect } from 'react';
const TestComp = () => {
  type EventHandler<Event extends React.SyntheticEvent> = (
    e: Event
  ) => void | null;

  type ChangeEventHandler = EventHandler<ChangeEvent<HTMLSelectElement>>;

  const eventHandler1: GlobalEventHandlers['onchange'] = (e) => {
    console.log(e.target); // 일반 Event는 target이 없음
  };

  const eventHandler2: ChangeEventHandler = (e) => {
    console.log(e.target); // 리액트 이벤트는 target 이 있음.
  };

  return (
    <div>
      testComp
      {/* <div onChange={(e) => eventHandler2(e)}></div> */}
    </div>
  );
};

export default TestComp;
