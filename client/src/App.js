import React, { Component } from 'react';
import './styles/url-shortener.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} render={props => <HomePage {...props} />} />
          <Route render={props => <NotFoundPage {...props} />} />
        </Switch>
      </Router>
    );
  }

}

export default App;