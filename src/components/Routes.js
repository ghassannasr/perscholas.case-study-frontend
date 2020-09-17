import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import About from './layout/About';
import Blog from './layout/Blog';
import Login from './Login';
//import  from './Posts';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Blog} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        {/* <Route path="/servicerequests" component={ServiceRequests} /> */}
      </Switch>
    );
  }

}

export default Routes;