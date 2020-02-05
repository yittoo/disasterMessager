import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from 'react-native';
// import {useAsyncStorage} from '@react-native-community/async-storage';

import {Button, TextArea} from '../components';
import {
  DEFAULT_VIEW_STYLE,
  ROUTE_NAMES,
  ASYNC_STORAGE_KEYS,
  SCENARIO_MESSAGE_KEYS,
} from '../constants';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      currentChosenScenarioMessage: SCENARIO_MESSAGE_KEYS.GOOD,
      scenarioMessages: {
        [SCENARIO_MESSAGE_KEYS.GOOD]: 'Good scenario message',
        [SCENARIO_MESSAGE_KEYS.BAD]: 'Bad scenario message',
      },
    };
  }

  componentDidMount() {
    this.getScenarioMessages();
  }

  getScenarioMessages = () => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.scenarioMessages)
      .then(scenarioMessages => {
        if (scenarioMessages) {
          this.setState({
            ...this.state,
            scenarioMessages: JSON.parse(scenarioMessages),
          });
        } else {
          // handle new scenario message creation TODO
        }
      })
      .catch(err => {
        console.log('Error geting scenario messages');
        console.log(err);
      });
  };

  onScenarioMessageUpdate = (targetScenarioMessage, value) => {
    const updatedScenarioMessages = {
      ...this.state.scenarioMessages,
      [targetScenarioMessage]: value,
    };
    this.setState({
      ...this.state,
      scenarioMessages: updatedScenarioMessages,
    });
  };

  onSaveScenarioMessage = value => {
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS, JSON.stringify(value));
  };

  onChangeScenarioMessage = to => {
    this.setState({
      ...this.state,
      currentChosenScenarioMessage: to,
    });
  };

  render() {
    const {navigation} = this.props;
    // console.log(JSON.stringify(navigation, null, 2));
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.Main}>
          <View style={s.Divider} />
          <View style={s.ButtonsWrapper}>
            <Button
              style={s.Button}
              onPress={() =>
                this.onChangeScenarioMessage(SCENARIO_MESSAGE_KEYS.GOOD)
              }>
              Good Scenario
            </Button>
            <Button
              style={s.Button}
              onPress={() =>
                this.onChangeScenarioMessage(SCENARIO_MESSAGE_KEYS.BAD)
              }>
              Bad Scenario
            </Button>
          </View>
          <View style={s.Divider} />
          <View>
            <TextArea
              onChangeText={text =>
                this.onScenarioMessageUpdate(
                  this.state.currentChosenScenarioMessage,
                  text,
                )
              }
              value={
                this.state.scenarioMessages[
                  this.state.currentChosenScenarioMessage
                ]
              }
            />
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
  }
}

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
