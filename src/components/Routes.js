import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

//import About from './layout/About';
import Blog from './layout/Blog';
import Login from './Login';

class Routes extends Component {

  render() {
    return (
      <Switch>
        {/* The Blog route is parameterized by a month and year. Passing 'current' defaults to current month and year */}
        <Route path='/blog/:monthyear' component={Blog} />
        {/* <Route path="/about" component={About} /> */}
        <Route path="/login" component={Login} />
      </Switch>
    );
  }

}

export default Routes;