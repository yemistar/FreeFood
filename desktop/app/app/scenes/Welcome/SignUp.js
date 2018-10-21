/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { createAccount, activate } from '../../actions/user';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../util/theme';
import Loading from '../../components/Loading';

class SignUp extends Component {
  constructor(props) {
      super(props);

      this.state = {
        fade: new Animated.Value(0),
        mfade: new Animated.Value(0),
        ftop: new Animated.Value(300),
        ltop: new Animated.Value(300),
        utop: new Animated.Value(300),
        etop: new Animated.Value(300),
        ptop: new Animated.Value(300),
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        loading: false,
        message: null
      }
  }

  componentDidMount() {
    Animated.timing(this.state.fade, { toValue: 1, duration: 500 }).start();
    Animated.stagger(0.5, [
      Animated.timing(this.state.ftop, { toValue: 0, duration: 500, }),
      Animated.timing(this.state.ltop, { toValue: 0, duration: 600, }),
      Animated.timing(this.state.utop, { toValue: 0, duration: 700, }),
      Animated.timing(this.state.etop, { toValue: 0, duration: 800, }),
      Animated.timing(this.state.ptop, { toValue: 0, duration: 900, }),
    ]).start();
  }

  onCreateAccount() {
    const { firstName, lastName, username, email, password, loading, message } = this.state;

    if(!message && !loading && firstName && firstName.length && username && username.length &&
      lastName && lastName.length && email && email.length && password && password.length) {
        this.setState({loading: true});
      axios.post('/user/create', {
        firstName,
        lastName,
        email,
        password,
        username
      }).then((res) => {
        if(res.data.status === 200) {
          this.props.dispatch(createAccount({ firstName, lastName, email, username }));
          this.props.dispatch(activate());
          this.setState({loading: false});
          this.props.nextPage();
        } else if(res.data.message) {
          this.setState({message: res.data.message}, () => {
            Animated.sequence([
              Animated.timing(this.state.mfade, { toValue: 1, duration: 500 }),
              Animated.timing(this.state.mfade, { toValue: 0, duration: 500, delay: 2000 })
            ]).start();
            setTimeout(() => this.setState({message: null, loading: false}), 3000);
          });
        } else {
          this.setState({loading: false});
        }
      }).catch((err) => {
        this.setState({message: 'Uh oh! Server is broken!'}, () => {
          Animated.sequence([
            Animated.timing(this.state.mfade, { toValue: 1, duration: 500 }),
            Animated.timing(this.state.mfade, { toValue: 0, duration: 500, delay: 2000 })
          ]).start();
          setTimeout(() => this.setState({message: null, loading: false}), 3000);
        });
      });
    }
  }

  renderMessage() {
    const { message, mfade } = this.state;
    if(message) {
        return (
          <View style={[styles.messageContainer]}>
            <Text style={styles.message}>
              {message}
            </Text>
          </View>
        )
    }
  }

  renderSubmit() {
    const { loading } = this.state;

    if(loading) {
      return (
        <Loading backColor={Theme.one.background} containerStyles={{alignSelf: 'center'}}/>
      )
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={() => this.onCreateAccount()}>
          <Text style={{fontSize: 20}}>Create Account</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { fade, ftop, ltop, etop, ptop, utop, message } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.input, {opacity: fade, top: ftop}]}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'First Name'}
            editable={message ? false : true}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
          />
        </Animated.View>
        <Animated.View style={[styles.input, {opacity: fade, top: ltop}]}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Last Name'}
            editable={message ? false : true}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
          />
        </Animated.View>
        <Animated.View style={[styles.input, {opacity: fade, top: utop}]}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Username'}
            editable={message ? false : true}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
        </Animated.View>
        <Animated.View style={[styles.input, {opacity: fade, top: etop}]}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Email'}
            editable={message ? false : true}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </Animated.View>
        <Animated.View style={[styles.input, {opacity: fade, top: ptop}]}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'Password'}
            secureTextEntry={true}
            editable={message ? false : true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </Animated.View>
        <Animated.View style={[styles.input, {opacity: fade, top: ptop}]}>
          {this.renderSubmit()}
        </Animated.View>
        {this.renderMessage()}
        <View style={styles.skipContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={() => this.props.onSkip()}>
            <Text>Login</Text>
            <FAIcon name="arrow-right" size={20} color={"#555"} style={styles.skipIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: Dimensions.get('window').width-20,
    padding: 5,
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height/2-100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    paddingBottom: 30,
    width: Dimensions.get('window').width-40,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.one.background
  },
  message: {
    fontSize: 20,
    color: Theme.one.text
  },
  skipIcon: {
    padding: 10
  },
  skipContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height-90,
    alignSelf: 'flex-end'
  },
  skipButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps)(SignUp);
