/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import sample_request from '../../util/sample_request.json';

import Loading from '../../components/Loading';
import CondencedEmail from '../../components/CondencedEmail';

import Navigator from '../components/Navigator'

class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        emails: [],
        loading: true
      }
  }

  componentWillMount() {}
  componentDidMount() {
    setTimeout(() => {
      this.setState({emails: sample_request, loading: false});
    }, 5000)
  }
  componentWillUnmount() {}

  renderCondenced() {
    const { emails, loading } = this.state;

    if(loading && emails.length <= 0) {
      return (
        <div key="emails" className="dashboard__loadingcontainer">
          <h2>Finding food for you!</h2>
          <Loading scaler={2} backColor={'#00cccc'}/>
        </div>
      );
    } else {
      return (
        <div key="emails" className="dashboard__emailcontainer">
          {emails.map((email, i) => {
            return (
              <CondencedEmail
                key={"c-" + i}
                animate={i*100}
                entities={email['data'][0]['entities']}
              />
            )
          })}
        </div>
      )
    }
  }

  render() {
    let arr = []

    arr.push(<Navigator key="nav"/>);
    arr.push(this.renderCondenced());

    return arr;
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Dashboard);
