import AnotherText from "./components/\bAnotherText";
import Block from "./components/Block";
import FloatingCard from "./components/FloatingCard";

const Tosslike = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Block height={"3000px"} />
      <FloatingCard />
      <AnotherText />
    </div>
  );
};

export default Tosslike;
