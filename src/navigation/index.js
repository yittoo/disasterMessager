import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {ROUTE_NAMES} from '../constants';

import {Main, ContactsSelector} from '../views';

const RouteConfigs = {
  // For each screen that you can navigate to, create a new entry like this:
  [ROUTE_NAMES.Home]: {
    screen: Main,

    navigationOptions: () => ({
      headerTitle: 'testtt',
    }),
  },
  [ROUTE_NAMES.ContactSelector]: {
    screen: ContactsSelector,

    navigationOptions: () => ({
      title: `Select Contacts`,
    }),
  },
};

const StackNavigatorConfig = {
  initialRouteName: ROUTE_NAMES.Home,
};

export const MainNavigator = createStackNavigator(
  RouteConfigs,
  StackNavigatorConfig,
);

export default createAppContainer(MainNavigator);
