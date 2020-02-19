import React from 'react';
import {View, StyleSheet, AsyncStorage, ToastAndroid} from 'react-native';
// import {useAsyncStorage} from '@react-native-community/async-storage';

import {Button, Select, Text} from '../components';
import {DEFAULT_VIEW_STYLE, ASYNC_STORAGE_KEYS} from '../constants';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLanguageChange = targetLng => {};

  render() {
    return (
      <View style={s.Container}>
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Text>Language:</Text>
        <View style={s.Divider} />
        <Select
          onValueChange={value => this.onLanguageChange(value)}
          items={[{label: 'English', value: 'en'}]}
          // value={this.state.currentChosenScenarioMessage}
          placeholder={{}}
        />
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Button>Save</Button>
      </View>
    );
  }
}

const s = StyleSheet.create({
  Container: {
    ...DEFAULT_VIEW_STYLE,
  },
  Divider: {
    marginVertical: 5,
  },
});
export default Settings;
