import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginForm from 'components/LoginForm'

class Homepage extends Component {
  render() {
    return (
      <div>
        Hello Homepage
        <Link to="/home">Home</Link>

        <LoginForm></LoginForm>
      </div>
    );
  }
}

export default Homepage;
