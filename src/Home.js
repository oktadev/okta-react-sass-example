import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import './App.scss';
import Calculator from './Calculator';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({authenticated});
    }
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    const {authenticated} = this.state;
    let body = null;
    if (authenticated) {
      body = (
        <div className="page-body">
          <div className="login-buttons">
            <button onClick={this.logout}>Logout</button>
          </div>
          <Calculator></Calculator>
        </div>
      );
    } else {
      body = (
        <div className="page-body">
          <div className="login-buttons">
            <button onClick={this.login}>Login</button>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Calculator</h1>
        {body}
      </div>
    );
  }
});
