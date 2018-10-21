/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../util/theme';
import { logout } from '../../actions/user';

export default class DrawerContent extends Component {

  onLogout() {
    this.props.dispatch(logout());
    Actions.refresh({ usersDrawerOpened: false, menuDrawerOpened: false })
    Actions.login();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}} >
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} >
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} >
          <Text style={styles.buttonText}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.onLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    backgroundColor: Theme.one.main
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginBottom: 10
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  }
});
