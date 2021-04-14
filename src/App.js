import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';

const config = {
  issuer: 'https://dev-133320.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/callback',
  client_id: '0oa28jhpsrHyEB6vu357',
  pkce: true
};

class App extends Component {

  render() {
    return (
      <Router>
        <Security {...config}>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/callback" component={ImplicitCallback}/>
        </Security>
      </Router>
    );
  }
}

export default App;
