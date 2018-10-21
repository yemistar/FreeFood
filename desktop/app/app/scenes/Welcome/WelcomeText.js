import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

import Theme from '../../util/theme';

export default class WelcomeText extends React.Component {
  state = {
    fade: new Animated.Value(0),
    top: new Animated.Value(-20),
  }

  componentDidMount() {
    Animated.timing(this.state.fade, { toValue: 1, duration: 1000 }).start();
    Animated.timing(this.state.top, { toValue: 0, duration: 1000, }).start();

    setTimeout(() => {
      Animated.timing(this.state.fade, { toValue: 0, duration: 1000 }).start();
    }, 2000);
  }

  render() {
    const { fade, top } = this.state;

    return (
      <Animated.View style={{ ...this.props.style, opacity: fade, top: top }} >
        <Text style={[Theme.styles.text, styles.text]}>
          Welcome!
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
})
