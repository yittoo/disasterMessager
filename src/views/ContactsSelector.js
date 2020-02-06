import React from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {Text, Button} from '../components';
import {DEFAULT_VIEW_STYLE, COLORS, ASYNC_STORAGE_KEYS} from '../constants';

class ContactsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionsGiven: false,
      permissionsAsked: false,
      contactsFetched: false,
    };
  }

  componentDidMount() {
    this.checkPermissionsGiven();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.contactsFetched && this.state.permissionsGiven) {
    }
  }

  checkPermissionsGiven = () => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.contactsPermissionsGiven)
      .then(permissionsGiven => {
        if (permissionsGiven) {
          this.setState({
            ...this.state,
            permissionsGiven: JSON.parse(permissionsGiven),
          });
        }
      })
      .catch(err => {
        console.log('Error geting contacts permission value', err);
      });
  };

  askContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Allow',
          buttonNegative: 'Block',
        },
      );
      if (granted === 'granted') {
        this.setState({
          ...this.state,
          permissionsAsked: true,
          permissionsGiven: true,
        });
        AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.contactsPermissionsGiven,
          JSON.stringify(true),
        )
          .then(() => {
            // do nothing
          })
          .catch(err => {
            console.log(
              'Error saving contacts permission success to AsyncStorage',
              err,
            );
          });
      } else {
        ToastAndroid.showWithGravity(
          'You need to provide contacts access from settings in order to select contacts',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        this.setState({
          ...this.state,
          permissionsAsked: true,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  renderContent = () => {
    const {permissionsGiven, permissionsAsked, contactsFetched} = this.state;
    if (permissionsGiven) {
      if (contactsFetched) {
        return (
          <>
            <Text style={s.AuthTextBox}>Contacts rendered here</Text>
            {/* TODO */}
          </>
        );
      } else {
        return (
          <View style={s.VerticallyCenter}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY_DARK} />
          </View>
        );
      }
    } else if (permissionsAsked) {
      return (
        <Text style={s.AuthTextBox}>
          You need to give permissions from settings to be able to use this app
        </Text>
      );
    } else {
      return (
        <>
          <Text style={s.AuthTextBox}>
            We need access to your Contacts List in order to select emergency
            contacts to use when necessary, press the button to prompt
            authorization.
          </Text>
          <Button onPress={this.askContactsPermission}>Authorize</Button>
        </>
      );
    }
  };

  render() {
    console.log(JSON.stringify(this.state, 0, 2));
    return <View style={DEFAULT_VIEW_STYLE}>{this.renderContent()}</View>;
  }
}

const s = StyleSheet.create({
  VerticallyCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AuthTextBox: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY_1,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default ContactsSelector;
