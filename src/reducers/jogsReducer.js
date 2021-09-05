export const SETJOGS = "SETJOGS"
export const SETCHANGEJOG = "SETCHANGEJOG"
export const SETLOADING = "SETLOADING"


const initialState = {
  jogs: [],
  changeJog: {},
  isLoading: true
}


export const jogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETJOGS: return {
      ...state, jogs: action.payload
    }
    default: return state
    case SETCHANGEJOG: return {
      ...state,
    }
    case SETLOADING: return  {
      ...state, isLoading: action.payload
    }
  }
}


export const setJogs = (jogs) => ({type: SETJOGS, payload: jogs})
export const setChangeJog = (jogs) => ({type: SETJOGS, payload: jogs})
export const setLoading = (isLoading) => ({type: SETLOADING, payload: isLoading})