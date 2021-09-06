import axios from "../config/axios";
import {setCurrentUser, setIsLogin} from "../reducers/userReducer";
import cookie from 'js-cookie'

export const logIn =  () => {
  return async dispatch => {
    try {
      const response = await axios.post('auth/uuidLogin',
        {
          uuid: 'Hello'
        },
        )
      dispatch(setIsLogin(true))
      console.log(response.data.response)
      const token = response.data.response.access_token
      cookie.set('token', token)
      //axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } catch (e) {
      console.log(e.response.data.error_message.error)
      cookie.erase('token')
      delete axios.defaults.headers.common.Authorization;
    }
  }
}

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const response = await axios.get('auth/user')
      dispatch(setCurrentUser(response.data.response))
    } catch (e) {
      console.log(e.response.data.error_message.error)
    }

  }
}