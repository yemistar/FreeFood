import React, { Component } from 'react';

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
    this.styles = {
      container: {
        'display': 'flex',
        'flexDirection': 'row',
        'justifyContent': 'center',
        'alignItems': 'center',
        'flexWrap': 'wrap',
        'width': 21,
        'height': 21,
        'borderRadius': '50%'
      },
      block: {
        'width': 7,
        'height': 7,
        'borderRadius': '50%',
      }
    }
    this.state = {
      colors: [
        { backgroundColor: 'red'},
        { backgroundColor: 'blue'},
        { backgroundColor: 'yellow'},
        { backgroundColor: 'green'},
        { backgroundColor: props.backColor ? props.backColor : 'white'},
        { backgroundColor: props.backColor ? props.backColor : 'white'},
        { backgroundColor: props.backColor ? props.backColor : 'white'},
        { backgroundColor: props.backColor ? props.backColor : 'white'},
        { backgroundColor: props.backColor ? props.backColor : 'white'},
      ],
      opacity: {
        'opacity': props.fadeIn ? 0 : 1
      }
    }

    let multiplier = props.scaler ? props.scaler : 1;
    this.styles.container['width'] = this.styles.container['width']*multiplier;
    this.styles.container['height'] = this.styles.container['height']*multiplier;
    this.styles.block['width'] = this.styles.block['width']*multiplier;
    this.styles.block['height'] = this.styles.block['height']*multiplier;

    this.speed = props.speed ? props.speed : 60;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let colors = this.state.colors;
      let opacity = this.state.opacity;

      if(this.props.reverse) {
        let color = colors[colors.length-1]; colors.pop(); colors.unshift(color)
      } else {
        let color = colors[0]; colors.shift(); colors.push(color);
      }

      if(opacity['opacity'] < 1) {
        opacity['opacity']+=0.06
      }

      this.setState({colors, opacity});
    }, this.speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={{...this.props.containerStyles}}>
        <div style={{...this.styles.container, ...this.state.opacity}}>
          <div style={{...this.state.colors[0], ...this.styles.block}}/>
          <div style={{...this.state.colors[1], ...this.styles.block}}/>
          <div style={{...this.state.colors[2], ...this.styles.block}}/>
          <div style={{...this.state.colors[7], ...this.styles.block}}/>
          <div style={{...this.styles.block}}/>
          <div style={{...this.state.colors[3], ...this.styles.block}}/>
          <div style={{...this.state.colors[6], ...this.styles.block}}/>
          <div style={{...this.state.colors[5], ...this.styles.block}}/>
          <div style={{...this.state.colors[4], ...this.styles.block}}/>
        </div>
      </div>
    );
  }
}
