import React, { Component } from 'react';

export default class FullEmail extends Component {
  constructor(props) {
      super(props);

      this.state = {

      }
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}

  renderRaw() {
    const { entities } = this.props;
    let { raw } = this.props;

    if(entities['dates']) {
      entities['dates'].map((l) => {
        let reg = new RegExp(l.toLowerCase());
        let r = reg.exec(raw.toLowerCase());
        if(r !== null) {
          raw = raw.slice(0, r.index) + "<b style=\"color: green;\">" + l + "</b>" + raw.slice(r.index+l.length, raw.length)
        }
      });
    }

    if(entities['times']) {
      entities['times'].map((l) => {
        let reg = new RegExp(l.toLowerCase());
        let r = reg.exec(raw.toLowerCase());
        if(r !== null) {
          raw = raw.slice(0, r.index) + "<b style=\"color: red;\">" + l + "</b>" + raw.slice(r.index+l.length, raw.length)
        }
      });
    }

    if(entities['locations']) {
      entities['locations'].map((l) => {
        let reg = new RegExp(l);
        let r = reg.exec(raw);
        if(r !== null) {
          raw = raw.slice(0, r.index) + "<b style=\"color: orange;\">" + l + "</b>" + raw.slice(r.index+l.length, raw.length)
        }
      });
    }

    if(entities['foods']) {
      entities['foods'].map((l) => {
        let reg = new RegExp(l.toLowerCase());
        let r = reg.exec(raw.toLowerCase());
        if(r !== null) {
          raw = raw.slice(0, r.index) + "<b style=\"color: blue;\">" + l + "</b>" + raw.slice(r.index+l.length, raw.length)
        }
      });
    }

    return raw;
  }

  renderDates(dates) {
    //green

    if(dates) {
      return (
        <div>
          {dates.map((d) => <b className="femail__entity" style={{color: 'green'}}>{d}</b>)}
        </div>
      )
    }
  }

  renderTimes(times) {
    //red
    if(times) {
      return (
        <div>
          {times.map((d) => <b className="femail__entity" style={{color: 'red'}}>{d}</b>)}
        </div>
      )
    }
  }

  renderLocations(locations) {
    //yellow
    if(locations) {
      return (
        <div>
          {locations.map((d) => <b className="femail__entity" style={{color: 'orange'}}>{d}</b>)}
        </div>
      )
    }
  }

  renderFoods(foods) {
    //blue
    if(foods) {
      return (
        <div>
          {foods.map((d) => <b className="femail__entity" style={{color: 'blue'}}>{d}</b>)}
        </div>
      )
    }
  }

  render() {
    const { entities, raw, subject } = this.props;

    return (
      <div className="femail__container animated fadeInUp">
        {this.renderDates(entities['dates'])}
        {this.renderTimes(entities['times'])}
        {this.renderLocations(entities['locations'])}
        {this.renderFoods(entities['foods'])}
        <h3 className="femail__subject">{subject}</h3>
        <p className="femail__raw" dangerouslySetInnerHTML={{__html: this.renderRaw()}}></p>
      </div>
    );
  }
}
