import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

function withStyle(Comp, styles) {
  function newComp(props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }
    return <Comp {...props} />
  }

  hoistNonReactStatics(newComp, Comp)
  
  return newComp
}

export default withStyle