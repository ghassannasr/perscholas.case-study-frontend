import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import About from './layout/About';
import Home from './layout/Home';
import Login from './Login';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }

}

export default Routes;