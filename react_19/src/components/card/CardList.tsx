import FlipCard from "./FlipCard";
import AttackCard from "./AttackCard";

function CardList() {
  return (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      <FlipCard front="🂠" back="🂡" />

      <AttackCard content="💥" />
    </div>
  );
}

export default CardList;
