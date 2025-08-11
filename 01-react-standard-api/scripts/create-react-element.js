function createElement(type, props, ...children) {
  return {
    $$typeof: Symbol("react.element"),
    key: null,
    props: { ...props, children },
    ref: null,
    type,
  };
}

const h = createElement;
