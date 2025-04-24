import { useState } from "react";
import MountTestComp from "./MountTestComp";

const ReconcileTest = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div>
      <button
        onClick={() => {
          setIsShow((cur) => !cur);
        }}
      >
        버튼
      </button>

      {isShow ? (
        <div key={1}>
          <MountTestComp key="same" type="div" value="참" />
        </div>
      ) : (
        <div key={2}>
          <MountTestComp key="same" type="div" value="거짓" />
        </div>
      )}
    </div>
  );
};

export default ReconcileTest;
