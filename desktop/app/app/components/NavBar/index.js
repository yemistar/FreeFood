/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../util/theme';

class NavBar extends Component {

  onPressMenuButton() {
     Actions.refresh({ key: 'menu_drawer', usersDrawerOpened: false, menuDrawerOpened: true })
  }

  onPressUsersButton() {
    Actions.refresh({ key: 'users_drawer', usersDrawerOpened: true, menuDrawerOpened: false });
  }

  renderNotifications() {
    const { notifications, pending } = this.props.user;

    if((notifications && notifications.length > 0) || (pending && pending.length > 0)) {
      return (
        <View style={styles.notContainer}>
          <Text style={styles.notAmount}>!</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.onPressMenuButton()}>
          <FAIcon name="bars" size={20} style={styles.menuIcon}/>
        </TouchableOpacity>
        <Text style={[Theme.styles.text, styles.title]}>{this.props.title}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.onPressUsersButton()}>
          <FAIcon name="user-circle" size={20} style={styles.menuIcon}/>
          {this.renderNotifications()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Theme.one.border,
    backgroundColor: Theme.one.main
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuIcon: {
    padding: 10,
    color: 'white'
  },
  notContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notAmount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 9
  }
});

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(NavBar);
