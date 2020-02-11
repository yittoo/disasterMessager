import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
// import {useAsyncStorage} from '@react-native-community/async-storage';

import {Button, TextArea, Text} from '../components';
import {
  DEFAULT_VIEW_STYLE,
  ROUTE_NAMES,
  ASYNC_STORAGE_KEYS,
  SCENARIO_MESSAGE_KEYS,
} from '../constants';

class Sms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>Sms</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({});

export default Sms;
