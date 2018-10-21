import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Actions, Scene, Router, Modal } from 'react-native-router-flux';
import axios from 'axios';

import configureStore from './store/configureStore';

import Launch from './scenes/Launch';
import Login from './scenes/Login';
import Welcome from './scenes/Welcome';
import Home from './scenes/Home';
import Profile from './scenes/Profile';
import MenuDrawer from './components/Drawer/MenuDrawer';
import UsersDrawer from './components/Drawer/UsersDrawer';
import NavBar from './components/NavBar';

import Theme from './util/theme';

//axios.defaults.baseURL = "http://10.26.24.167:5000/api/v1";
axios.defaults.baseURL = "http://192.168.1.92:5000/api/v1";

//<Scene key="launch" component={Launch} title="Launch" hideNavBar />
//<Scene key="welcome" component={Welcome} title="Welcome" hideNavBar />
//<Scene key="login" component={Login} title="Login" hideNavBar />
/*<Scene
  key="profile"
  component={Profile}
  title="Profile"
  hideNavBar={false}
/>*/

const scenes = Actions.create(
  <Scene key="modal" component={Modal}>
    <Scene key="menu_drawer" component={MenuDrawer} open={false}>
    <Scene key="users_drawer" component={UsersDrawer} open={false}>
      <Scene key="root" tabs={false} navBar={NavBar}>
        <Scene
          key="home"
          component={Home}
          title="Home"
          hideNavBar={false}
        />
      </Scene>
    </Scene>
    </Scene>
  </Scene>
)

const RouterWithRedux = connect()(Router);

export const { store, persistor } = configureStore();

export default class App extends Component {
  constructor(props) { super(props); }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterWithRedux duration={100} scenes={scenes} sceneStyle={styles.container}/>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.one.background,
  },
});
