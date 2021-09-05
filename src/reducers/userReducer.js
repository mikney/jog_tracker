

const LOGIN = "LOGIN"
const SETCURRENTUSER = "SETCURRENTUSER"


const initialState = {
  isLogin: false,
  currentUser: {}
}


export const userReducer = ( state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {...state, isLogin: action.payload}
    }
    case SETCURRENTUSER: {
      return {...state, currentUser: action.payload}
    }
    default: return state
  }
}


export const setIsLogin = (isLogin) => ({type: LOGIN, payload: isLogin})
export const setCurrentUser = (currentUser) => ({type: SETCURRENTUSER, payload: currentUser})

