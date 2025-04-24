import React, { useEffect } from "react";

const MountTestComp = ({
  type,
  value,
}: {
  type: "div" | "input";
  value: string;
}) => {
  useEffect(() => {
    console.log("MountTestComp mount", type);
    return () => {
      console.log("MountTestComp unmount", type);
    };
  }, []);

  return (
    <>
      {type === "div" ? (
        <div>{value}</div>
      ) : (
        <input type="text" disabled value={value} />
      )}
    </>
  );
};

export default MountTestComp;
