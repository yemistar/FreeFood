/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../util/theme';

export default class SearchFriend extends Component {

  onPress() {

  }

  render() {
    const { username, firstName, lastName, friend } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.nameContainer}>
          <View style={styles.nameWrapper}>
            <Text style={styles.firstName}>{firstName}</Text>
            <Text style={styles.lastName}>{lastName}</Text>
          </View>
          <View style={styles.amountContainer}>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: Theme.one.border,
    marginBottom: 10,
    backgroundColor: Theme.one.background,
    borderRadius: 3,
  },
  username: {
    color: Theme.one.go,
    fontSize: 10
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameWrapper: {
    flexDirection: 'row'
  },
  firstName: {
    color: Theme.one.text,
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 5
  },
  lastName: {
    color: Theme.one.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  amount: {
    color: Theme.one.text,
    fontWeight: 'bold',
    marginRight: 5
  },
  priceIcon: {
    color: Theme.colors.moneyGreen
  },
});
