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

class EditMessages extends React.Component {
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
          this.setState({
            ...this.state,
            scenarioMessages: {
              [SCENARIO_MESSAGE_KEYS.GOOD]: 'Good scenario message',
              [SCENARIO_MESSAGE_KEYS.BAD]: 'Bad scenario message',
            },
          });
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
    const stringifiedValue = JSON.stringify(value);
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.scenarioMessages, stringifiedValue)
      .then(() => {
        ToastAndroid.showWithGravity(
          'Scenario Messages Saved',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      })
      .catch(err => {
        console.log('AsyncStorage.set Failed: ', err);
      });
  };

  onChangeScenarioMessage = to => {
    this.setState({
      ...this.state,
      currentChosenScenarioMessage: to,
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={s.Container}>
        <View style={s.Divider} />
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
          <Button
            onPress={() => {
              this.onSaveScenarioMessage(this.state.scenarioMessages);
              Keyboard.dismiss();
            }}>
            Save Scenario Messages
          </Button>
          <Button
            onPress={() => {
              this.getScenarioMessages();
              Keyboard.dismiss();
            }}>
            Cancel Change
          </Button>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  Container: {
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

export default EditMessages;
