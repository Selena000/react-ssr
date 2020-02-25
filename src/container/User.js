import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
import { Redirect } from 'react-router-dom'

function User(props) {
  if (true) {
    return <Redirect to="/login"></Redirect>
  }
  return <div>
    <h1>GO, {props.userInfo.name}.....{props.userInfo.best}</h1>
  </div>
}

User.loadData = store => {
  return store.dispatch(getUserInfo())
}

// export default Index
export default connect(
  state => ({ userInfo: state.user.userInfo }), 
  { getUserInfo }
)(User)