/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { history } from '../../../index.js';

import sample_request from '../../util/sample_request.json';

import Loading from '../../components/Loading';
import CondencedEmail from '../../components/CondencedEmail';
import FullEmail from '../../components/FullEmail';

import Navigator from '../components/Navigator'

class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        emails: [],
        fullEmail: null,
        loading: true
      }
  }

  componentWillMount() {}
  componentDidMount() {
    axios.post('/api/list').then((res) => {
      this.setState({emails: res.data, loading: false});
    }).catch((err) => {
      history.push('/auth/login');
    });
    //setTimeout(() => {
    //  this.setState({emails: sample_request.concat(sample_request), loading: false});
    //}, 5000)
  }
  componentWillUnmount() {}

  renderFullEmail() {
    const { fullEmail } = this.state;

    if(fullEmail) {
      return (
        <FullEmail
          entities={fullEmail['data'][0]['entities']}
          raw={fullEmail['data'][0]['raw']}
          subject={fullEmail['data'][0]['subject']}
        />
      )
    }
  }

  renderCondenced() {
    const { emails, loading } = this.state;

    if(loading && emails.length <= 0) {
      return (
        <div key="emails" className="dashboard__loadingcontainer">
          <h2 className="dashboard__loadingtext">Finding food for you!</h2>
          <Loading scaler={2} backColor={'#00cccc'}/>
        </div>
      );
    } else {
      return (
        <div key="emails" className="dashboard__emailcontainer">
          {this.renderFullEmail()}
          <div className="dashboard__condencedcontainer">
            {emails.map((email, i) => {
              return (
                <CondencedEmail
                  key={"c-" + i}
                  animate={i*100}
                  entities={email['data'][0]['entities']}
                  onClick={() => {
                    this.setState({fullEmail: email});
                    window.scrollTo(0,0);
                  }}
                />
              )
            })}
          </div>
        </div>
      );
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
