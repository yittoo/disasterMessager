import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ROUTE_NAMES, COLORS} from '../constants';
import {Header} from '../components';

import {
  ContactsSelector,
  Settings,
  ShareOnOtherApps,
  Sms,
  EditMessages,
} from '../views';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ViewWithSettingsAccess = ({name, component, title}) => (
  <Stack.Navigator initialRouteName={name}>
    <Stack.Screen
      name={name}
      component={component}
      options={{
        title,
        header: ({scene, previous, navigation}) => {
          const {options} = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
          return (
            <Header
              title={title}
              leftButton={
                previous ? (
                  <Icon
                    name="left"
                    onPress={navigation.goBack}
                    size={18}
                    color={COLORS.WHITE}
                  />
                ) : null
              }
              rightButton={
                <Icon
                  name="setting"
                  onPress={() =>
                    navigation.navigate({name: ROUTE_NAMES.Settings})
                  }
                  size={18}
                  color={COLORS.WHITE}
                />
              }
            />
          );
        },
      }}
    />
    <Stack.Screen
      name={ROUTE_NAMES.Settings}
      component={Settings}
      options={{
        title: 'Settings',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: ({scene, previous, navigation}) => {
          const {options} = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
          return (
            <Header
              title={title}
              leftButton={
                previous ? (
                  <Icon
                    name="left"
                    onPress={navigation.goBack}
                    size={18}
                    color={COLORS.WHITE}
                  />
                ) : null
              }
            />
          );
        },
      }}
    />
  </Stack.Navigator>
);

const SmsAndContactStack = () => (
  <Stack.Navigator initialRouteName={ROUTE_NAMES.Sms} headerMode="none">
    <Stack.Screen name={ROUTE_NAMES.Sms} component={Sms} />
    <Stack.Screen
      name={ROUTE_NAMES.ContactSelector}
      component={ContactsSelector}
    />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator initialRouteName={ROUTE_NAMES.SmsContactSelectorStack}>
    <Tab.Screen
      name={ROUTE_NAMES.EditTemplates}
      options={{title: 'Edit Message'}}>
      {() => (
        <ViewWithSettingsAccess
          name={ROUTE_NAMES.EditTemplates}
          component={EditMessages}
          title={'Edit Message'}
        />
      )}
    </Tab.Screen>
    <Tab.Screen name={ROUTE_NAMES.SmsContactSelectorStack}>
      {() => (
        <ViewWithSettingsAccess
          name={ROUTE_NAMES.SmsContactSelectorStack}
          component={SmsAndContactStack}
          title={'Send SMS'}
        />
      )}
    </Tab.Screen>
    <Tab.Screen
      name={ROUTE_NAMES.ShareOnOther}
      options={{title: 'Share on Other'}}>
      {() => (
        <ViewWithSettingsAccess
          name={ROUTE_NAMES.ShareOnOther}
          component={ShareOnOtherApps}
          title={'Share on Other'}
        />
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

// const MainAndSettingsStack = () => (
//   <Stack.Navigator initialRouteName={ROUTE_NAMES.AppTabs}>
//     <Stack.Screen
//       name={ROUTE_NAMES.AppTabs}
//       component={AppTabs}
//       options={{
//         title: 'App',
//         header: ({scene, previous, navigation}) => {
//           const {options} = scene.descriptor;
//           const title =
//             options.headerTitle !== undefined
//               ? options.headerTitle
//               : options.title !== undefined
//               ? options.title
//               : scene.route.name;
//           return (
//             <Header
//               title={title}
//               leftButton={
//                 previous ? (
//                   <Icon name="left" onPress={navigation.goBack} />
//                 ) : null
//               }
//               rightButton={
//                 <Icon
//                   name="setting"
//                   onPress={() =>
//                     navigation.navigate({name: ROUTE_NAMES.Settings})
//                   }
//                   size={18}
//                   color={COLORS.WHITE}
//                 />
//               }
//             />
//           );
//         },
//       }}
//     />
//     <Stack.Screen
//       name={ROUTE_NAMES.Settings}
//       component={Settings}
//       options={{title: 'Settings'}}
//     />
//   </Stack.Navigator>
// );

export default () => (
  <NavigationContainer>
    <AppTabs />
  </NavigationContainer>
);
