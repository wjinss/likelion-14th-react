export default function Output(props) {
  const classNames = `output ${props.isAnimate ? "is-animate" : ""}`.trim();

  return React.createElement(
    React.Fragment,
    {},
    React.createElement("output", { className: classNames }, props.children),
    React.createElement("output", { className: classNames }, props.children + 1)
  );
}
