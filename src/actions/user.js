import axios from "axios";
import {setCurrentUser, setIsLogin} from "../reducers/userReducer";
import cookie from 'js-cookie'

export const logIn =  () => {
  return async dispatch => {
    try {
      const response = await axios.post('https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin',
        {uuid: 'Hello'},
        {
          headers: {
            Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf',
          }
        })
      dispatch(setIsLogin(true))
      console.log(response.data.response)
      const token = response.data.response.access_token
      cookie.set('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
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
      const response = await axios.get('https://jogtracker.herokuapp.com/api/v1/auth/user',
        {
          headers: {
            Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf',
          }
        }
      )
      dispatch(setCurrentUser(response.data.response))
    } catch (e) {
      console.log(e.response.data.error_message.error)
    }

  }
}