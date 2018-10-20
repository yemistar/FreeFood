/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <div className="navigator__element">Home</div>
        <div className="navigator__title animated fadeInDown">Free Food!</div>
        <div className="navigator__element">Login</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Navigator);
