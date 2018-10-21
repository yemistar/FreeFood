/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../util/theme';

export default class DrawerFriend extends Component {

  onPress() {
    const { username } = this.props;
    Actions.refresh({key: "users_drawer", usersDrawerOpened: false, menuDrawerOpened: false })
    InteractionManager.runAfterInteractions(() => {
      Actions.profile({username});
    });
  }

  render() {
    const { username, firstName, lastName, amount } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.onPress()}>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.nameContainer}>
          <View style={styles.nameWrapper}>
            <Text style={styles.firstName}>{firstName}</Text>
            <Text style={styles.lastName}>{lastName}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount}</Text>
            <FAIcon name="money" size={15} style={styles.priceIcon} />
          </View>
        </View>
      </TouchableOpacity>
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
    color: Theme.one.attention,
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
