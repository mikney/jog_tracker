import Axios from "axios";

const axios = Axios.create({
  baseURL: 'https://jogtracker.herokuapp.com/api/v1/',

})
axios.defaults.headers.common.Authorization = 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf';


export default axios;