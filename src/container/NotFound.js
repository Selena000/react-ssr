import React from 'react'
import { Route } from 'react-router-dom'

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.statuscode = code;
        return children;
      }}
    />
  )
}

function NotFound() {
  return (
    <Status code={404}>
      <h1>404</h1>
    <img id="image-404" src="./404.jpeg"></img>
    </Status>
  );
}


export default NotFound