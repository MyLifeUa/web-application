import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// import views
import Home from './views/Home/Home'
import Login from './views/Login/Login'

function App () {
  const hist = createBrowserHistory()

  return (
    <div id="app">
      <Router history={hist}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
