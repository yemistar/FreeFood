/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { Actions } from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import SearchModal from './SearchModal';
import DrawerFriend from './DrawerFriend';
import DrawerMessage from './DrawerMessage';

import Theme from '../../util/theme';

class DrawerContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: 'Friends',
      page: 0,
      search: false,
    }
  }

  renderFriends() {
    const { friends } = this.props.user;

    return (
      <FlatList
        style={styles.list}
        data={friends}
        keyExtractor={(item) => item.username}
        renderItem={({item}) => {
          return (
            <DrawerFriend
              username={item.username}
              firstName={item.firstName}
              lastName={item.lastName}
              amount={item.amount}
            />
          )
        }}
      />
    );
  }

  renderPending() {
    const { pending } = this.props.user;

    if(pending.length <= 0) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            No Requests!
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.list}
          data={pending}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            return (
              <DrawerFriend
                username={item.username}
                firstName={item.firstName}
                lastName={item.lastName}
                amount={item.amount}
              />
            )
          }}
        />
      );
    }


  }

  renderMessages() {
    const { notifications } = this.props.user;

    if(notifications.length <= 0) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            No Messages!
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.list}
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            return (
              <DrawerMessage
                username={item.username}
                date={item.date}
                title={item.title}
                message={item.message}
              />
            )
          }}
        />
      );
    }
  }

  renderTab() {
    const { page } = this.state;

    switch(page) {
      case 0: return this.renderFriends();
      case 1: return this.renderPending();
      case 2: return this.renderMessages();
      default: return this.renderFriends();
    }
  }

  renderPendingAmount() {
    const { pending } = this.props.user;

    if(pending && pending.length > 0) {
      return (
        <View style={styles.notContainer}>
          <Text style={styles.notAmount}>!</Text>
        </View>
      );
    }
  }

  renderNotificationsAmount() {
    const { notifications } = this.props.user;

    if(notifications && notifications.length > 0) {
      return (
        <View style={styles.notContainer}>
          <Text style={styles.notAmount}>!</Text>
        </View>
      );
    }
  }

  renderTitles() {
    return (
      <View style={styles.titleButtonContainer}>
        <TouchableOpacity style={styles.titleButton} onPress={() => this.setState({page: 0, title: "Friends"})}>
          <FAIcon name={"user-circle"} style={styles.titleIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleButton} onPress={() => this.setState({page: 1, title: "Requests"})}>
          <FAIcon name={"plus-circle"} style={styles.titleIcon} />
          {this.renderPendingAmount()}
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleButton} onPress={() => this.setState({page: 2, title: "Messages"})}>
          <FAIcon name={"envelope"} style={styles.titleIcon} />
          {this.renderNotificationsAmount()}
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleButton} onPress={() => this.setState({search: true})}>
          <FAIcon name={"search"} style={styles.titleIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchModal
          onClose={() => this.setState({search: false})}
          opened={this.state.search}
        />
        <Text style={styles.title}>{this.state.title}</Text>
        {this.renderTab()}
        {this.renderTitles()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Theme.one.main
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
    paddingLeft: 5
  },
  list: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusText: {
    fontSize: 20,
    color: 'white',
  },
  searchButton: {
    backgroundColor: Theme.one.background,
    borderRadius: 3,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  searchText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    justifyContent: 'center'
  },
  searchIcon: {
    color: 'black',
    fontSize: 15
  },
  titleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  titleButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleIcon: {
    color: 'white',
    fontSize: 20
  },
  titleBorder: {
    width: 1,
    height: '100%',
    backgroundColor: 'white'
  },
  notContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
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

export default connect(mapStateToProps)(DrawerContent);
