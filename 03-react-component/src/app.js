import { LogoFunction as Logo } from "./components/logo.js";
import { ShortcutFunction as Shortcut } from "./components/shortCut.js";
import Output from "./components/output.js";

export default function App(props) {
  let isAnimate = true;

  if (props.count >= props.targetCount) {
    console.log("애니메이션 종료!");
    isAnimate = false;
  }

  return React.createElement(
    "div",
    { className: "randomCountUpApp" },
    React.createElement(Logo),
    React.createElement(Output, { isAnimate }, props.count),
    React.createElement(Shortcut)
  );
}
