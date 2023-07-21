import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <div className='app__page'>
          <Sidebar />
          <div className='app__container'>
            <Switch>
              <Route path='/search/:searchTerm' component={Search} />
              <Route exact path='/' component={Home} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
