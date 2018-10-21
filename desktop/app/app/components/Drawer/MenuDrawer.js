import React, { Component } from 'react';
import { View, Text, StyleSheet, InteractionManager } from 'react-native';
import RNDrawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

import MenuDrawerContent from './MenuDrawerContent';

export default class Drawer extends Component {
  constructor(props) { super(props); }

  render () {
    const state = this.props.navigationState
    const children = state.children
    return (
      <RNDrawer
        ref='navigation'
        type='displace'
        open={state.menuDrawerOpened}
        side='left'
        onOpen={() => {
          InteractionManager.runAfterInteractions(() => {
            Actions.refresh({key: state.key, usersDrawerOpened: false, menuDrawerOpened: true })
          });
        }}
        onClose={() => {
          Actions.refresh({key: state.key, usersDrawerOpened: false, menuDrawerOpened: false })
        }}
        content={<MenuDrawerContent {...this.props}/>}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenDuration={100}
        useInteractionManager={true}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </RNDrawer>
    )
  }

  /*tweenHandler={(ratio) => ({
    main: { opacity: Math.max(0.54, 1 - ratio) }
  })}*/
}

//styles={drawerStyles}
