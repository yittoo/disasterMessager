import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RNShare from 'react-native-share';

import {Button, Text, Select} from '../components';
import {DEFAULT_VIEW_STYLE, SCENARIO_MESSAGE_KEYS, COLORS} from '../constants';
import {loadScenarioMessages} from '../store/actions';
import {GetCoords} from '../helpers';

class ShareOnOtherApps extends React.Component {
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

  asyncGetCoordinatesInfo = async () => {
    const coordinatesInfo = await GetCoords();
    if (coordinatesInfo) {
      this.setState({
        ...this.state,
        coordinatesInfo,
      });
    }
  };

  onChangeScenarioMessage = value => {
    this.setState({
      currentChosenScenarioMessage: value,
    });
  };

  onShare = message => {
    RNShare.open({
      message,
    });
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  };

  render() {
    const {currentChosenScenarioMessage, coordinatesInfo} = this.state;
    const {scenarioMessages} = this.props.mainReducer;
    return (
      <View style={s.Container}>
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Text>Please select message to share</Text>
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
            this.onShare(
              `${scenarioMessages[currentChosenScenarioMessage]} ${coordinatesInfo}`,
            )
          }>
          Share on other app
        </Button>
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

const mapStateToProps = ({mainReducer}) => ({
  mainReducer,
});

const mapDispatchToProps = dispatch => ({
  loadScenarioMessages: () => dispatch(loadScenarioMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareOnOtherApps);
