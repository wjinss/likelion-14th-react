export default function Output(props) {
  const classNames = `output ${props.isAnimate ? "is-animate" : ""}`.trim();

  return React.createElement(
    "output",
    { className: classNames },
    props.children
  );
}

// ------------------연습

// () => {
//   /* export default */ function OutputComponent(props) {
//     const classNames = `output ${props.isAnimate ? "is-animate" : ""}`.trim();

//     return React.createElement(
//       "output",
//       { className: classNames },
//       props.children
//     );
//   }
// };
