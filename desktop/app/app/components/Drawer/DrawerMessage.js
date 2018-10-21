/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Theme from '../../util/theme';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default class DrawerMessage extends Component {
  render() {
    const { username, date, title, message } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.date}>{moment(date).format('MMM DD, hh:mm a')}</Text>
          <TouchableOpacity style={styles.trashTouch}>
            <FAIcon name={"trash"} style={styles.trash}/>
          </TouchableOpacity>
        </View>

        {username ? <Text style={styles.username}>{username}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.message}
          ellipsizeMode={'tail'}
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    borderWidth: 1,
    borderColor: Theme.one.border,
    marginBottom: 10,
    backgroundColor: Theme.one.background,
    borderRadius: 3,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  trashTouch: {
    paddingLeft: 10,
    paddingRight: 10
  },
  trash: {
    color: Theme.one.text
  },
  date: {
    color: Theme.one.go,
    fontSize: 10,
    fontWeight: "500"
  },
  username: {
    color: Theme.one.go,
    fontSize: 10
  },
  title: {
    color: Theme.one.text,
    fontWeight: 'bold',
    fontSize: 15
  },
  message: {
    color: Theme.one.text,
    fontSize: 13
  }
});
