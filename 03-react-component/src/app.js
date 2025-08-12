import { LogoFunction as Logo } from "./components/logo.js";
import { ShortcutFunction as Shortcut } from "./components/shortCut.js";
import Output from "./components/output.js";

export default function App(props) {
  // 문 === 값이 없다 === return에서 사용 불가
  // if (props.count >= props.targetCount) {
  //   console.log("애니메이션 종료!");
  //   isAnimate = false;
  // }

  // 식 === 값이 있다 === return에서 사용 가능
  // const isComplete = props.count >= props.targetCount;
  // console.log(isComplete);
  // 논리 연산자 식
  // 삼항 연산자 식
  // 옵셔널 체이닝, null 병합 연산자

  return React.createElement(
    "div",
    { className: "randomCountUpApp" },
    React.createElement(Logo),
    React.createElement(
      Output,
      { isAnimate: props.count < props.targetCount ? true : false },
      props.count
    ),
    React.createElement(Shortcut)
  );
}
