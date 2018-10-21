/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { history } from '../../../index.js';

class Navigator extends Component {
  constructor(props) {
      super(props);

      this.state = {

      }
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div className="navigator__container">
        <div className="navigator__element" onClick={() => history.push('/')}>Home</div>
        <div className="navigator__title animated fadeInDown">Free Food!</div>
        <div className="navigator__element" onClick={() => history.push('/auth/login')}>Login</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Navigator);
