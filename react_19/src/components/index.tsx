import CardList from "./card/CardList";

const ComponentTestLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardList />
    </div>
  );
};

export default ComponentTestLayout;
