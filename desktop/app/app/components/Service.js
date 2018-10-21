/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import Theme from '../util/theme';
import nodeEmoji from 'node-emoji';

export default class Service extends Component {

  renderEmojis() {
    let { emojis } = this.props;

    if(emojis && Array.isArray(emojis) && emojis.length > 0) {
      emojis = emojis.length > 3 ? emojis.slice(0, 3) : emojis;
      return (
        <View style={styles.emojisContainer}>
          {emojis.map((e, i) => <Text key={'emoji-' + i} style={styles.emoji}>{nodeEmoji.get(e.name)}</Text>)}
        </View>
      )
    }
  }

  render() {
    const { title, description, price, style, username, overPrice } = this.props;

    return (
      <View style={[styles.container, style]}>
        {username ? <View style={styles.usernameContainer}><Text style={styles.username}>{username}</Text></View> : null}
        <View style={styles.heading}>
          <View style={styles.titleContainer}>
            <View styles={styles.titleWrapper}>
              <Text
                style={styles.title}
                numberOfLines={2}
                ellipsizeMode={'tail'}
              >
                {title}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, {color: overPrice ? Theme.colors.red : Theme.one.text}]}>{price}</Text>
              <FAIcon name="money" style={styles.priceIcon}/>
            </View>
          </View>
          {this.renderEmojis()}
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.description}
            numberOfLines={4}
            ellipsizeMode={'tail'}
          >
            {description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 3
  },
  usernameContainer: {

  },
  username: {
    color: Theme.one.attention,
    fontSize: 10
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    //borderBottomWidth: 3,
    //borderBottomColor: Theme.one.border,
    marginBottom: 5
  },
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    flexWrap: 'wrap',
    maxWidth: 60,
  },
  emoji: {
    fontSize: 15,
    margin: 5,
    flexWrap: 'wrap'
  },
  titleContainer: {
    flexDirection: 'column',
    //justifyContent: 'space-between',
    flex: 1
  },
  titleWrapper: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Theme.one.main
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.one.text,
    marginRight: 5
  },
  priceIcon: {
    fontSize: 15,
    color: Theme.colors.moneyGreen
  },
  descriptionContainer: {
    flexDirection: 'column',
    flex: 1
  },
  description: {
    color: Theme.one.text
  }
});
