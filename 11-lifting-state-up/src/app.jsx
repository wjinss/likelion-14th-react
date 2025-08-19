import { useState } from "react";
import { LearnSection } from "@/components";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <LearnSection title="상태 끌어올리기" style={{ marginInlineStart: 20 }}>
      <p>다른 컴포넌트와 상태 공유하기</p>
      <Counter count={count} setCount={setCount} />
      <PrintCount count={count} />
    </LearnSection>
  );
}

function Counter({ count, setCount }) {
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      {count}
    </button>
  );
}

function PrintCount({ count = -1 }) {
  return <output style={{ padding: 12 }}>{count}</output>;
}
