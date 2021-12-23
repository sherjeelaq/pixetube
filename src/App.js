import React from "react"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/search/:searchTerm" component={Search} />
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
