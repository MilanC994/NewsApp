import React from 'react'
import './App.css'
import 'react-activity/dist/library.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Header from './components/Header'
import ArticlesContainer from './components/ArticlesContainer'
import Article from './components/Article'

function App() {
  return (
    <Router>
      <div className="app d-flex flex-column align-items-center justify-content-center">
        <Header />
        <Switch>
          <Route path="/" exact component={ArticlesContainer} />
          <Route path="/article/:title" component={Article} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
