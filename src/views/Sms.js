import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SendSMS from 'react-native-sms';

import {Button, Select, Text} from '../components';
import {GetCoords} from '../helpers';
import {loadScenarioMessages} from '../store/actions';
import {
  COLORS,
  DEFAULT_VIEW_STYLE,
  ROUTE_NAMES,
  SCENARIO_MESSAGE_KEYS,
} from '../constants';

class Sms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChosenScenarioMessage: null,
      coordinatesInfo: '',
    };
  }

  componentDidMount() {
    this.asyncLoadScenarioMessages();
    this.asyncGetCoordinatesInfo();
  }

  asyncLoadScenarioMessages = async () => {
    const scenarioMessages = await this.props.loadScenarioMessages();
    if (scenarioMessages) {
      const keys = Object.keys(scenarioMessages);
      const firstKey = keys[0] ? keys[0] : null;
      this.setState({
        ...this.state,
        currentChosenScenarioMessage: firstKey,
      });
    }
  };

  onChangeScenarioMessage = value => {
    this.setState({
      currentChosenScenarioMessage: value,
    });
  };

  sendSms = (to, body) => {
    const regexToRemoveAllNonNumbers = /\D/g;
    const recipients = to.map(c =>
      c.phone.replace(regexToRemoveAllNonNumbers, ''),
    );
    SendSMS.send(
      {
        body,
        recipients,
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            'error: ' +
            error,
        );
      },
    );
  };

  asyncGetCoordinatesInfo = async () => {
    const coordinatesInfo = await GetCoords();
    if (coordinatesInfo) {
      this.setState({
        ...this.state,
        coordinatesInfo,
      });
    }
  };

  render() {
    const {navigation} = this.props;
    const {currentChosenScenarioMessage, coordinatesInfo} = this.state;
    const {scenarioMessages, selectedContacts} = this.props.defaultReducer;
    return (
      <View style={s.Container}>
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Button
          onPress={() =>
            navigation.navigate({name: ROUTE_NAMES.ContactSelector})
          }>
          Select Contacts (Currently Chosen: {selectedContacts.length})
        </Button>
        <View style={s.Divider} />
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Text>Please select message to send</Text>
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
        <View style={s.Divider} />
        <Text>Message Preview</Text>
        <View style={s.Divider} />
        <Text style={s.MessagePreview} textStyle={s.MessagePreviewText}>
          {scenarioMessages[currentChosenScenarioMessage]
            ? `${scenarioMessages[currentChosenScenarioMessage]} ${coordinatesInfo}`
            : 'Please select a scenario message'}
        </Text>
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Button
          disabled={!scenarioMessages[currentChosenScenarioMessage]}
          onPress={() =>
            this.sendSms(
              selectedContacts,
              `${scenarioMessages[currentChosenScenarioMessage]} ${coordinatesInfo}`,
            )
          }>
          Send the message to all chosen contacts
        </Button>
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
    justifyContent: 'space-between',
  },
  Button: {
    flexGrow: 1,
  },
  Divider: {
    marginVertical: 5,
  },
  MessagePreview: {
    borderColor: COLORS.GRAY_1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.WHITE,
    elevation: 7,
  },
  MessagePreviewText: {
    color: '#333',
  },
});

const mapStateToProps = ({defaultReducer}) => ({
  defaultReducer,
});

const mapDispatchToProps = dispatch => ({
  loadScenarioMessages: () => dispatch(loadScenarioMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sms);
