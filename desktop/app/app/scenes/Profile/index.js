/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import Service from '../../components/Service';
import Loading from '../../components/Loading';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Fetch from '../../util/fetch';
import Theme from '../../util/theme';

class Profile extends Component {
  constructor(props) {
    super(props);

    let userWallet =  props.user.wallet.find((u) => u.username === props.username)
    userWallet = userWallet ? userWallet.amount : 0;

    this.state = {
      loading: true,
      scrollTo: props.scrollTo ? props.scrollTo : false,
      username: props.username,
      services: [],
      tasks: [],
      firstName: null,
      lastName: null,
      tab: props.tab ? props.tab : 0,
      amountFade: new Animated.Value(0),
      amountRight: new Animated.Value(40),
      infoFade: new Animated.Value(0),
      infoLeft: new Animated.Value(40),
      amount: props.user.friends.find((u) => u.username === props.username).amount,
      userWallet
    }

    this.fetching = false;
  }

  componentWillMount() {
    const { token, friends } = this.props.user;
    const { username } = this.props;

    if(!this.fetching) {
      axios.post('/get/services', {username, token}).then((res) => {
        if(res.data.status === 200) {
          let services = res.data.services;
          axios.post('/get/tasks', {username, token}).then((res) => {
            if(res.data.status === 200) {
              let tasks = res.data.tasks;
              this.setState({
                services,
                tasks,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                loading: false
              }, () => {
                this.fetching = false
                Animated.stagger(0.5, [
                  Animated.timing(this.state.amountFade, { toValue: 1, duration: 500 }),
                  Animated.timing(this.state.amountRight, { toValue: 0, duration: 500 })
                ]).start();
                Animated.stagger(0.5, [
                  Animated.timing(this.state.infoFade, { toValue: 1, duration: 500 }),
                  Animated.timing(this.state.infoLeft, { toValue: 0, duration: 500 })
                ]).start();
              });
            } else {

            }
          }).catch((err) => {
            console.log(err);
          });
        } else {

        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  renderTasks() {
    const { tasks, username } = this.state;

    return (
      <FlatList
        style={styles.list}
        data={tasks}
        extraData={this.state}
        keyExtractor={(item) => item.title}
        renderItem={({item, index}) => {
          if(index >= tasks.length-1) {
            return (
                <Service
                  style={{marginBottom: 10}}
                  emojis={item.emojis}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
            );
          } else {
            return (
              <View>
                <Service
                  style={{marginBottom: 10}}
                  emojis={item.emojis}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
                <View style={styles.seperator} />
              </View>
            );
          }

        }}
      />
    );
  }

  renderServices() {
    const { services, username, userWallet } = this.state;

    return (
      <FlatList
        style={styles.list}
        data={services}
        extraData={this.state}
        keyExtractor={(item) => item.title}
        renderItem={({item, index}) => {
          if(index >= services.length-1) {
            return (
                <Service
                  style={{marginBottom: 10}}
                  emojis={item.emojis}
                  title={item.title}
                  price={item.price}
                  overPrice={userWallet < item.price}
                  description={item.description}
                />
            );
          } else {
            return (
              <View>
                <Service
                  style={{marginBottom: 10}}
                  emojis={item.emojis}
                  title={item.title}
                  price={item.price}
                  overPrice={userWallet < item.price}
                  description={item.description}
                />
                <View style={styles.seperator} />
              </View>
            );
          }

        }}
      />
    );
  }

  renderTab() {
    const { tab } = this.state;

    switch(tab) {
      case 0: return this.renderServices();
      case 1: return this.renderTasks();
      default: return this.renderServices();
    }
  }

  renderTabs() {
    const { tab } = this.state;

    return (
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => this.setState({tab: 0})}>
          <Text style={styles.tabText}>Services</Text>
        </TouchableOpacity>
        <View style={{height: '100%', width: 2, backgroundColor: Theme.one.border}}/>
        <TouchableOpacity style={styles.tab} onPress={() => this.setState({tab: 1})}>
          <Text style={styles.tabText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAmount() {
    const { amountFade, amountRight, amount } = this.state;

    return (
      <Animated.View style={[styles.amount, {opacity: amountFade, right: amountRight}]}>
        <Text style={styles.amountText}>{amount}</Text>
        <FAIcon name="money" style={styles.priceIcon} />
      </Animated.View>
    );
  }

  renderInfo() {
    const { infoFade, infoLeft, username, firstName, lastName } = this.state;

    return (
      <Animated.View style={[styles.info, {opacity: infoFade, left: infoLeft}]}>
        <Image source={require('../../images/avatar.png')} style={styles.avatar}/>
        <View>
          <Text style={styles.username}>{this.state.username}</Text>
          <Text style={styles.name}>{firstName} {lastName}</Text>
        </View>
      </Animated.View>
    )
  }

  render() {
    const { loading } = this.state;

    if(loading) {
      return <View style={styles.loadingContainer}><Loading /></View>
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.heading}>
            {this.renderInfo()}
            {this.renderAmount()}
          </View>
          <View style={styles.content}>
            {this.renderTabs()}
            {this.renderTab()}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60+10,
  },
  heading: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  info: {
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  username: {
    fontSize: 12,
    color: Theme.one.attention
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.one.text
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  tabs: {
    flexDirection: 'row',
    borderTopColor: Theme.one.border,
    borderTopWidth: 2,
    borderBottomColor: Theme.one.border,
    borderBottomWidth: 2
  },
  tab: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.one.main
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  amountText: {
    color: Theme.one.text,
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 5
  },
  priceIcon: {
    fontSize: 17,
    color: Theme.colors.moneyGreen
  },
  list: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  seperator: {
    height: 3,
    backgroundColor: Theme.one.border
  }
});

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Profile);
