import React, {useEffect, useMemo, useState} from 'react'
import Jogs from "./pages/Jogs";
import {Route, Switch, useLocation,  Redirect} from "react-router-dom";
import SignIn from "./pages/SignIn";
import AddJog from "./pages/AddJog";
import Info from "./pages/Info";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, logIn} from "./actions/user";
import {setIsLogin} from "./reducers/userReducer";
import Contacts from "./pages/Contacts";
import Header from "./components/Header";
import cookie from 'js-cookie'




function App() {

  const dispatch = useDispatch()
  const {isAuth} = useSelector(state => ({
    isAuth: state.user.isLogin
  }))
  let location = useLocation();

  const [isFiltered, setFiltered] = useState(false)
  const [isMenu, setIsMenu] = useState(false)

  function onClickHandler() {
    dispatch(logIn())
  }
  useEffect(() => {
    const token = cookie.get('token')
    if(token) {
      dispatch(setIsLogin(true))
      dispatch(getCurrentUser())
    }
  },[])


  React.useEffect(() => {
    if(isMenu) {
      setIsMenu(false)
    }
  }, [location]);


  return (
    <>

      <Header setIsMenu={setIsMenu} setFiltered={setFiltered} isFiltered={isFiltered} isMenu={isMenu} />
      {!isAuth ?
        <Switch>
          <Route exact path={'/'} >
            <SignIn clickHandler={onClickHandler} />
          </Route>
          <Redirect to="/" />
        </Switch>
      :  <Switch>
          <Route path={['/edit/:id', '/add']} component={AddJog} />
          <Route path={'/info'} component={Info} />
          <Route path={'/contacts'} component={Contacts} />
          <Route path={'/jogs'}  >
            <Jogs isFiltered={isFiltered} />
          </Route>
          <Redirect to="/jogs" />
        </Switch>
        }

    </>
  );
}

export default App;
