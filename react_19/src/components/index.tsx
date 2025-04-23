import IframeLayout from "./iframe";

const ComponentTestLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <IframeLayout />
    </div>
  );
};

export default ComponentTestLayout;
