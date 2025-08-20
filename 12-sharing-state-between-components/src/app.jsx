import { useState } from "react";
import emotions from "@/data/emotions.json";
import { ChangeButton, EmotionFigure } from "./components/emotions";
import LearnSection from "./components/learn-section";

export default function App() {
  const [randomIndex, setRandomIndex] = useState(
    getRandomIndex(emotions.length)
  );

  const handleClick = () => {
    setRandomIndex(getRandomIndex(emotions.length));
  };
  return (
    <LearnSection title="리액트 컴포넌트 상태 공유 학습">
      <EmotionFigure
        label={emotions[randomIndex].message}
        image={emotions[randomIndex].image}
      />
      <ChangeButton
        getRandomIndex={handleClick}
        label={emotions[randomIndex].message}
      />
    </LearnSection>
  );
}

function getRandomIndex(limit) {
  return Math.floor(Math.random() * limit);
}
