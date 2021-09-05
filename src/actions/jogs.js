import axios from "axios";
import {setJogs, setLoading} from "../reducers/jogsReducer";


export const getJogs = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get('https://jogtracker.herokuapp.com/api/v1/data/sync',
        {
          headers: {
            Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf',
          }
        }
      )
      const respSort = response.data.response.jogs.sort((a, b) => b.date - a.date )
      dispatch(setJogs(respSort))
      dispatch(setLoading(false))
    } catch (e) {
      console.log(e.response.data.error_message.error)
      dispatch(setLoading(false))

    }


  }
}