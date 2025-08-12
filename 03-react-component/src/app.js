import { LogoFunction as Logo } from "./components/logo.js";
import { ShortcutFunction as Shortcut } from "./components/shortCut.js";
import Output from "./components/output.js";

export default function App(props) {
  return React.createElement(
    "div",
    { className: "randomCountUpApp" },
    React.createElement(Logo),
    React.createElement(Output, {}, props.count),
    React.createElement(Shortcut)
  );
}
