/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import axios from 'axios';

import Theme from '../../util/theme';
import Loading from '../../components/Loading';

import WelcomeText from './WelcomeText';
import ActivateAccount from './ActivateAccount';
import SignUp from './SignUp';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    }
  }

  renderPage() {
    const { page } = this.state;

    switch(page) {
      case 0:
        setTimeout(() => this.setState({page: 1}), 3000);
        return <WelcomeText />
      case 1:
        return <SignUp nextPage={() => this.setState({page: 2})} onSkip={() => Actions.login()}/>
      case 2:
        return <ActivateAccount />
      default:
        return <Loading backColor={Theme.one.background} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps)(Welcome);
