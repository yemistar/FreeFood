/* @flow weak */

import React, { Component } from 'react';

export default class CondencedEmail extends Component {
  constructor(props) {
      super(props);

      this.state = {
        display: 'none'
      }
  }

  componentWillMount() {
      const { animate } = this.props;

      setTimeout(() => {
        this.setState({display: "flex"});
      }, animate);
  }

  renderLocations(locations) {
    let arr = []
    if(locations) {
      for(let i = 0; i < 2; i++) {
        let loc = locations[i]
        if(loc) {
          arr.push(<span key={"l-" + i} className="cemail__location">{loc}</span>);
        } else {
          break;
        }
      }
    }
    return arr;
  }

  renderDatesandTimes(dates, times) {
    let dateTimeString = [];
    if(dates) {
      for(let i = 0; i < 2; i++) {
        let d = dates[i]
        if(d) {
          dateTimeString.push(d);
          if(i !== 1 && dates[i+1]) { dateTimeString.push(<b className="cemail__seperator">or</b>) }
        } else {
          break;
        }
      }
    }

    if(times) {
      if(dateTimeString.length > 0) { dateTimeString.push(<b className="cemail__seperator">at</b>); }
      for(let i = 0; i < 2; i++) {
        let t = times[i]
        if(t) {
          dateTimeString.push(t);
          if(i !== 1 && times[i+1]) { dateTimeString.push(<b className="cemail__seperator">or</b>) }
        } else {
          break;
        }
      }
    }

    return dateTimeString;
  }

  renderFoods(foods) {
    let arr = []
    if(foods) {
      for(let i = 0; i < 6; i++) {
        let f = foods[i]
        if(f) {
          arr.push(<span key={"f-" + i} className="cemail__food">{f}</span>);
        } else {
          break;
        }
      }
    }
    return arr;
  }

  render() {
    const { entities } = this.props;
    const { display } = this.state;

    let locations = this.renderLocations(entities['locations']);
    let locationsJSX = null;
    if(locations) {
      locationsJSX = <div className="cemail__locations">{locations}</div>
    }

    let datetimes = this.renderDatesandTimes(entities['dates'], entities['times']);
    let datetimesJSX = null;
    if(datetimes) {
      datetimesJSX = <div className="cemail__times">{datetimes}</div>
    }


    return (
      <div className="cemail__container animatedFast fadeInLeft" style={{display}}>
        {locationsJSX}
        {datetimesJSX}
        <div className="cemail__foods">{this.renderFoods(entities['foods'])}</div>
      </div>
    );
  }
}
