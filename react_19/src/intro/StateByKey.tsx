import { useState } from 'react';

export default function StateByKey() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  const player = isPlayerA ? 'Taylor' : 'Sarah';

  return (
    <div>
      <Counter key={player} person={player} />
      <Counter key="1" person={player} />

      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }: { person: string }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person}'s score: {score}
      </h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
