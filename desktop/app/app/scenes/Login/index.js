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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';

import { login, activate } from '../../actions/user';

import Theme from '../../util/theme';
import Loading from '../../components/Loading';

class Login extends Component {
  constructor(props) {
      super(props);

      this.state = {
        fade: new Animated.Value(0),
        mfade: new Animated.Value(0),
        etop: new Animated.Value(300),
        ptop: new Animated.Value(300),
        email: '',
        password: '',
        loading: true,
        message: null
      }
  }

  componentWillMount() {
    const { token } = this.props.user;

    if(token) {
      axios.post('/user/auth', {token}).then((res) => {
        if(res.data.status === 200) {
          this.props.dispatch(login({
            email: res.data.email,
            token,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: res.data.username
          }));
          this.props.dispatch(activate());
          Actions.home();
        } else {
          this.setState({loading: false});
        }
      }).catch((err) => {
        console.log(err);
        this.setState({loading: false});
      });
    } else {
      this.setState({loading: false});
    }
  }

  componentDidMount() {
    Animated.timing(this.state.fade, { toValue: 1, duration: 500 }).start();
    Animated.stagger(0.5, [
      Animated.timing(this.state.etop, { toValue: 0, duration: 500, }),
      Animated.timing(this.state.ptop, { toValue: 0, duration: 600, }),
    ]).start();
  }

  onLogin() {
    const { email, password, loading, message } = this.state;

    if(!message && !loading && email && email.length && password && password.length) {
      this.setState({loading: true});
      axios.post('/user/login', {
        email,
        password
      }).then((res) => {
        if(res.data.status === 200) {
          this.props.dispatch(login({ email, token: res.data.token, firstName: res.data.firstName, lastName: res.data.lastName }));
          this.props.dispatch(activate());
          Actions.home();
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
        this.setState({message: 'Uh on! Server is broken!'}, () => {
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
        <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { fade, ftop, ltop, etop, ptop, message } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.input, {opacity: fade, top: etop}]}>
          <TextInput
            style={styles.textInput}
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
            style={styles.textInput}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Login);
