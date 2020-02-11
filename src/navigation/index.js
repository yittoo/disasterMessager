import React from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ROUTE_NAMES} from '../constants';

import {
  Main,
  ContactsSelector,
  Settings,
  ShareOnOtherApps,
  Sms,
  EditMessages,
} from '../views';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SmsAndContactStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTE_NAMES.Sms}>
      <Stack.Screen
        component={() => (
          <View>
            <Text>SMS</Text>
          </View>
        )}
        name={ROUTE_NAMES.Sms}
        // component={Sms}
        options={{title: 'SMS'}}
      />
      <Stack.Screen
        name={ROUTE_NAMES.ContactSelector}
        component={() => (
          <View>
            <Text>ContactSelector</Text>
          </View>
        )}
        // component={ContactsSelector}
        options={{title: 'Select Contacts'}}
      />
    </Stack.Navigator>
  );
}

// function AppTabs() {
//   return (
//     <Tab.Navigator initialRouteName={ROUTE_NAMES.SmsContactSelectorStack}>
//       <Tab.Screen
//         name={ROUTE_NAMES.EditTemplates}
//         component={EditMessages}
//         options={{title: 'Edit Message'}}
//       />
//       <Tab.Screen
//         name={ROUTE_NAMES.SmsContactSelectorStack}
//         component={SmsAndContactStack}
//         options={{title: 'Send SMS'}}
//       />
//       <Tab.Screen
//         name={ROUTE_NAMES.ShareOnOther}
//         component={ShareOnOtherApps}
//         options={{title: 'Share on Other'}}
//       />
//     </Tab.Navigator>
//   );
// }

// function MainAndSettingsStack() {
//   return (
//     <Stack.Navigator initialRouteName={ROUTE_NAMES.AppTabs}>
//       <Stack.Screen
//         name={ROUTE_NAMES.AppTabs}
//         component={AppTabs}
//         options={{title: 'App'}}
//       />
//       <Stack.Screen
//         name={ROUTE_NAMES.Settings}
//         component={Settings}
//         options={{title: 'Settings'}}
//       />
//     </Stack.Navigator>
//   );
// }

export default () => (
  <NavigationContainer>
    <SmsAndContactStack />
  </NavigationContainer>
);
