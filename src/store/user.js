// import axios from 'axios'

const GET_USERINFO = 'INDEX/GET_USERINFO'
const changeList = user => ({
  type: GET_USERINFO,
  user
})

export const getUserInfo = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('http://localhost:9090/api/user/userInfo')
      .then(res => {
        const { data } = res.data
        dispatch(changeList(data))
      })
  }
}

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case GET_USERINFO:
      const newState = {
        ...state,
        userInfo: action.user
      }
      return newState
    default:
      return state
  }
}