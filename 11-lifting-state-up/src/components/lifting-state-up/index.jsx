import { useState } from "react";
import { LearnSection } from "@/components";
import Counter from "./couter";
import PrintCount from "./print-count";

export default function LiftingStateUpDemo() {
  console.log("리프팅 스테이트업 렌더링");

  const [count, setCount] = useState(0);
  return (
    <LearnSection title="상태 끌어올리기">
      <Counter count={count} setCount={setCount} />
      <PrintCount count={count} />
    </LearnSection>
  );
}
