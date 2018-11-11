import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Homepage extends Component {
  render() {
    return (
      <div>
        Hello Homepage
        <Link to="/home">Home</Link>
      </div>
    );
  }
}

export default Homepage;
