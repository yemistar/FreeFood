import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

/**
  <Loading
    containerStyles={{padding: 10}}
    scaler={2}
    speed={100}
    reverse
  />
*/

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      colors: [
        'red',
        'blue',
        'yellow',
        'green',
        props.backColor ? props.backColor : 'white',
        props.backColor ? props.backColor : 'white',
        props.backColor ? props.backColor : 'white',
        props.backColor ? props.backColor : 'white',
      ],
      opacity: props.fadeIn ? 0 : 1
    }

    this.speed = props.speed ? props.speed : 60;
  }

  componentDidMount() {
    /*this.interval = setInterval(() => {
      let colors = this.state.colors;
      let opacity = this.state.opacity;

      if(this.props.reverse) {
        let color = colors[colors.length-1]; colors.pop(); colors.unshift(color)
      } else {
        let color = colors[0]; colors.shift(); colors.push(color);
      }

      opacity < 1 ? opacity+=0.06 : null;

      this.setState({colors, opacity});
    }, this.speed);*/
  }

  componentWillUnMount() {
    //clearInterval(this.interval);
  }

  render() {

    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );

    /*return (
      <View style={this.props.containerStyles}>
        <View style={[styles.container, {opacity: this.state.opacity}]}>
          <View style={[{backgroundColor: this.state.colors[0]}, styles.block]} />
          <View style={[{backgroundColor: this.state.colors[1]}, styles.block]} />
          <View style={[{backgroundColor: this.state.colors[2]}, styles.block]} />
          <View style={[{backgroundColor: this.state.colors[7]}, styles.block]} />
          <View style={[styles.block, this.blockScaler]} />
          <View style={[{backgroundColor: this.state.colors[3]}, styles.block]} />
          <View style={[{backgroundColor: this.state.colors[6]}, styles.block]} />
          <View style={[{backgroundColor: this.state.colors[5]}, styles.block]} />
          <View style={[{backgroundColor: this.state.colors[4]}, styles.block]} />
        </View>
      </View>
    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  block: {
    width: 13.3,
    height: 13.3,
    borderRadius: 6.6,
  }
});
