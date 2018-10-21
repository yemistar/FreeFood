/* @flow weak */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Theme from '../util/theme';

export default class CondencedEmail extends Component {

  renderLocations(locations) {
    let arr = []
    let index = 0;
    if(locations) {
      for(let i = 0; i < 2; i++) {
        let loc = locations[i]
        if(loc) {
          arr.push(<Text key={"l-" + index} style={styles.locationText}>{loc}</Text>);
          index+=1;
        } else {
          break;
        }
      }
    }
    return arr;
  }

  renderDatesandTimes(dates, times) {
    let dateTimeString = [];
    let index = 0;
    if(dates) {
      for(let i = 0; i < 2; i++) {
        let d = dates[i]
        if(d) {
          dateTimeString.push(<Text key={"l-"+ index} style={styles.timeDateText}>{d}</Text>); index+=1;
          if(i !== 1 && dates[i+1]) { dateTimeString.push(<Text key={"l-"+ index} style={styles.seperator}>or</Text>); index+=1; }
        } else {
          break;
        }
      }
    }

    if(times) {
      if(dateTimeString.length > 0) { dateTimeString.push(<Text key={"l-"+ index} style={styles.seperator}>at</Text>); index+=1; }
      for(let i = 0; i < 2; i++) {
        let t = times[i]
        if(t) {
          dateTimeString.push(<Text key={"l-"+ index} style={styles.timeDateText}>{t}</Text>); index+=1;
          if(i !== 1 && times[i+1]) { dateTimeString.push(<Text key={"l-"+ index} style={styles.seperator}>or</Text>); index+=1; }
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
          arr.push(<Text key={"f-" + i} style={styles.foodText}>{f}</Text>);
        } else {
          break;
        }
      }
    }
    return arr;
  }

  render() {
    const { entities } = this.props;

    const locationsjsx = this.renderLocations(entities['locations']);
    const datetimesjsx = this.renderDatesandTimes(entities['dates'], entities['time']);
    const foodsjsx = this.renderFoods(entities['foods']);

    return (
      <View style={styles.container} onClick={() => this.props.onClick()}>
        <View style={styles.locationsContainer}>
          {locationsjsx}
        </View>
        <View style={styles.dateTimesContainer}>
          {datetimesjsx}
        </View>
        <View style={styles.foodsContainer}>
          {foodsjsx}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Theme.one.border
  },
  locationsContainer: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dateTimesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  foodsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  locationText: {
    fontSize: 15,
    margin: 3,
    color: Theme.one.text,
  },
  foodText: {
    fontSize: 15,
    margin: 5,
    color: Theme.one.text,
  },
  timeDateText: {
    fontSize: 15,
    margin: 3,
    color: Theme.one.text,
  },
  seperator: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 3,
    color: Theme.one.text,
  }
});
