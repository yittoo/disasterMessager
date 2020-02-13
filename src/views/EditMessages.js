import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';

import {Button, TextArea, Text, Select} from '../components';
import {
  DEFAULT_VIEW_STYLE,
  ROUTE_NAMES,
  ASYNC_STORAGE_KEYS,
  SCENARIO_MESSAGE_KEYS,
} from '../constants';
import {loadScenarioMessages, saveScenarioMessages} from '../store/actions';

class EditMessages extends React.Component {
  constructor(props) {
    super(props);
    this.defaultScenarioMessages = {
      [SCENARIO_MESSAGE_KEYS.GOOD]: 'Good scenario',
      [SCENARIO_MESSAGE_KEYS.BAD]: 'Bad scenario',
    };
    this.state = {
      language: 'en',
      currentChosenScenarioMessage: SCENARIO_MESSAGE_KEYS.GOOD,
      scenarioMessages: this.defaultScenarioMessages,
    };
  }

  componentDidMount() {
    this.asyncLoadScenarioMessages();
  }

  asyncLoadScenarioMessages = async () => {
    const scenarioMessages = await this.props.loadScenarioMessages();
    if (scenarioMessages) {
      this.setState({
        ...this.state,
        scenarioMessages,
      });
    }
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

  onDefaultScenarioMessage = () => {
    this.setState({
      ...this.state,
      scenarioMessages: this.defaultScenarioMessages,
    });
  };

  onSaveScenarioMessage = value => {
    this.props.saveScenarioMessages(value);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.Container}>
          <View style={s.Divider} />
          <View style={s.Divider} />
          <Select
            onValueChange={value => this.onChangeScenarioMessage(value)}
            items={[
              {label: 'Good Scenario', value: SCENARIO_MESSAGE_KEYS.GOOD},
              {label: 'Bad Scenario', value: SCENARIO_MESSAGE_KEYS.BAD},
            ]}
            value={this.state.currentChosenScenarioMessage}
            placeholder={{}}
          />
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
                this.asyncLoadScenarioMessages();
                Keyboard.dismiss();
              }}>
              Cancel Change
            </Button>
            <Button
              onPress={() => {
                this.onDefaultScenarioMessage();
                Keyboard.dismiss();
              }}>
              Default
            </Button>
            <Button
              onPress={() => {
                this.onSaveScenarioMessage(this.state.scenarioMessages);
                Keyboard.dismiss();
              }}>
              Save Scenario
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const s = StyleSheet.create({
  Container: {
    ...DEFAULT_VIEW_STYLE,
  },
  ButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button: {
    flexGrow: 1,
  },
  Divider: {
    marginVertical: 5,
  },
});

const mapStateToProps = ({defaultReducer}) => ({
  defaultReducer,
});

const mapDispatchToProps = dispatch => ({
  loadScenarioMessages: () => dispatch(loadScenarioMessages()),
  saveScenarioMessages: scenarioMessages =>
    dispatch(saveScenarioMessages(scenarioMessages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMessages);
