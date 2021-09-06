import axios from "../config/axios";
import {setJogs, setLoading} from "../reducers/jogsReducer";


export const getJogs = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get('data/sync')
      const respSort = response.data.response.jogs.sort((a, b) => b.date - a.date )
      dispatch(setJogs(respSort))
      dispatch(setLoading(false))
    } catch (e) {
      console.log(e.response.data.error_message.error)
      dispatch(setLoading(false))

    }


  }
}