import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  List,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import samples from '../../util/sample_request.json';

import Fetch from '../../util/fetch';
import Theme from '../../util/theme';

import CondencedEmail from '../../components/CondencedEmail';
import Loading from '../../components/Loading';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      emails: []
    }
  }

  componentDidMount() {
    this.setState({emails: samples});
  }

  renderEmails() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.emails}
        keyExtractor={(item) => item['data'][0]['id']}
        renderItem={({item}) => {
          return (
            <CondencedEmail entities={item['data'][0]['entities']} />
          );
        }}
      />
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        {loading ? <Loading /> : this.renderEmails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 60+10,
  },
  list: {
    flex: 1,
    width: Dimensions.get('window').width
  },
});

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Home);
