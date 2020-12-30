import './App.css';
import Header from './components/Header'
import ArticlesContainer from './components/ArticlesContainer'
import Article from './components/Article'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={ArticlesContainer}/>
          <Route path="/article" exact component={Article} />
        </Switch> 
      </div>
    </Router>
  );
}

export default App;
