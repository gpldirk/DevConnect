import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'

// redux
import store from './redux/store'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/actions/auth'

import './App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Fragment>
      
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>

    </Fragment>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
