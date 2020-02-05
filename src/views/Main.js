import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {Button, TextArea} from '../components';
import {DEFAULT_VIEW_STYLE, ROUTE_NAMES} from '../constants';

const Main = props => {
  const {navigation} = props;
  console.log(JSON.stringify(navigation, null, 2));
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.Main}>
        <View style={s.Divider} />
        <View style={s.ButtonsWrapper}>
          <Button style={s.Button}>Good Scenario</Button>
          <Button style={s.Button}>Bad Scenario</Button>
        </View>
        <View style={s.Divider} />
        <View>
          <TextArea />
        </View>
        <View style={s.Divider} />
        <View style={s.ButtonsWrapper}>
          <Button>Save Message for Good Scenario</Button>
          <Button>Cancel Change</Button>
        </View>
        <View style={s.Divider} />
        <View style={s.ButtonsWrapper}>
          <Button
            style={s.Button}
            onPress={() =>
              navigation.navigate({routeName: ROUTE_NAMES.ContactSelector})
            }>
            Select Contacts
          </Button>
          <Button style={s.Button}>Send SMS</Button>
        </View>
        <View style={s.Divider} />
        <View>
          <Button>Share on Another App</Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Main.navigationOptions = data => {
  return {};
};

const s = StyleSheet.create({
  Main: {
    ...DEFAULT_VIEW_STYLE,
  },
  ButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Button: {
    flexGrow: 1,
  },
  Divider: {
    marginVertical: 5,
  },
});

export default Main;
