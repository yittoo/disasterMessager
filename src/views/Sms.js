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
      <View style={s.Container}>
        <View style={s.Divider} />
        <View style={s.Divider} />
        <Button
          onPress={() =>
            navigation.navigate({name: ROUTE_NAMES.ContactSelector})
          }>
          Select Contacts (Currently Chosen:{' '}
          {this.props.defaultReducer.selectedContacts.length})
        </Button>
        <Text>Sms</Text>
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
});

const mapStateToProps = ({defaultReducer}) => ({
  defaultReducer,
});

export default connect(mapStateToProps)(Sms);
