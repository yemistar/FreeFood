/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { Actions } from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import SearchFriend from './SearchFriend';

import Modal from 'react-native-modal';
import Theme from '../../util/theme';

class SearchModal extends Component {
  constructor(props) {
      super(props);

      this.state = {
        searchQuery: '',
        searchResults: []
      }

      this.endOfList = false;
      this.fetching = false;
      this.startIndex = 0;

      this.placeholders = [
        "Find a new friend!",
        "May the query be with you...",
        "I see everything..."
      ];
  }

  searchPlaceholder() {
    let chance = Math.floor(Math.random() * 100);

    if(chance === 50) {
        return this.placeholders[Math.floor(Math.random() * this.placeholders.length)];
    } else {
        return "Find your friends!"
    }
  }

  fetchSearch(query, start, concat) {
    const { token, friends } = this.props.user;

    if(!this.fetching && !this.endOfList) {
      this.fetching = true;
      axios.post('/search/users', {
        token,
        query,
        start,
      }).then((res) => {
        if(res.data.status === 200) {
          const dbusers = res.data.users.map((dbu) => {
            const friend = friends.find((u) => u.username === dbu.username);
            return { ...dbu, friend }
          });
          if(concat) {
            this.setState({searchResults: this.state.searchResults.concat(dbusers)}, () => {
              this.endOfList = res.data.end ? true : false;
              this.fetching = false;
            });
          } else {
            this.setState({searchResults: dbusers}, () => {
              this.endOfList = res.data.end ? true : false;
              this.fetching = false;
            });
          }
        } else {
          this.fetching = false;
        }
      }).catch((err) => {
        console.log(err);
        this.fetching = false;
      })
    }
  }

  renderSearchResults() {
    const { searchResults } = this.state;
    return (
      <FlatList
        style={styles.friendList}
        data={searchResults}
        keyExtractor={(item) => item.username}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          this.startIndex+=20;
          this.fetchSearch(this.state.searchQuery, this.startIndex, true);
        }}
        renderItem={({item}) => {
          return (
            <SearchFriend
              username={item.username}
              firstName={item.firstName}
              lastName={item.lastName}
              friend={item.friend ? true : false}
            />
          );
        }}
      />
    );
  }

  renderSearchInput() {
    return (
      <TextInput
        style={styles.searchInput}
        value={this.state.searchQuery}
        maxLength={100}
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize={'none'}
        placeholder={this.searchPlaceholder()}
        underlineColorAndroid={'transparent'}
        onBlur={() => this.setState({search: false})}
        onChangeText={(text) => {
          this.endOfList = false;
          this.setState({searchQuery: text});
          this.fetchSearch(text, 0, false);
        }}
      />
    )
  }

  render() {
    return (
      <Modal
        isVisible={this.props.opened}
        supportedOrientations={['portrait']}
        onBackdropPress={() => {
          this.setState({searchQuery: '', searchResults: []});
          this.props.onClose()
        }}
        onBackButtonPress={() => {
          this.setState({searchQuery: '', searchResults: []});
          this.props.onClose()
        }}
        useNativeDriver={true}
      >
        <View style={styles.container}>
          {this.renderSearchInput()}
          {this.renderSearchResults()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.one.background,
    borderRadius: 3,
    flexDirection: 'column',
    padding: 5
  },
  searchInput: {
    borderBottomWidth: 3,
    borderBottomColor: Theme.one.border
  },
  friendList: {
    padding: 5
  },
});

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(SearchModal);
