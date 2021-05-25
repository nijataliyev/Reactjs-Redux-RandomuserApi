import './App.scss';
import Home from './containers/Home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NotFound from './containers/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Home/>
          <Route exact path="/" component={Home}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
