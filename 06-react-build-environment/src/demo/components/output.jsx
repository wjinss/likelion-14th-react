import React from 'react'

//  JSX Transform (classic: Legacy React v16)
// React.createElement(type, props, ...children)

// New JSX Transform (automiac: Modern React v17+)
// import { jsx as _jsx } from 'react/jsx-runtime'
// _jsx(type, props)

export default function Output(props) {
  // return _jsx('output', {
  //   className: `output ${props.isAnimate ? 'is-animate' : ''}`,
  //   children: props.children,
  // })

  const classNames = `output ${props.isAnimate ? 'is-animate' : ''}`
  return <output className={classNames.trim()}>{props.children}</output>
}
