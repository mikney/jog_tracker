import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {userReducer} from "./userReducer";
import {jogsReducer} from "./jogsReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user: userReducer,
  jogs: jogsReducer,
})



export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))