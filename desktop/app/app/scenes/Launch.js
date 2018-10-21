/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

import Theme from '../util/theme';
import Loading from '../components/Loading';

class Launch extends Component {
  componentWillMount() {
    const { user } = this.props;

    if(!user.activated) {
      Actions.welcome();
    } else {
      Actions.login();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading backColor={Theme.one.background} />
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

export default connect(mapStateToProps)(Launch);
