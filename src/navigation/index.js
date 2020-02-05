import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {ROUTE_NAMES} from '../constants';

import {Main, ContactsSelector} from '../views';

const RouteConfigs = {
  // For each screen that you can navigate to, create a new entry like this:
  [ROUTE_NAMES.Home]: {
    screen: Main,

    navigationOptions: () => ({
      headerTitle: 'Main',
    }),
  },
  [ROUTE_NAMES.ContactSelector]: {
    screen: ContactsSelector,

    navigationOptions: () => ({
      headerTitle: `Select Contacts`,
    }),
  },
};

const StackNavigatorConfig = {
  initialRouteName: ROUTE_NAMES.Home,
  defaultNavigationOptions: data => {
    return {};
  },
};

export const MainNavigator = createStackNavigator(
  RouteConfigs,
  StackNavigatorConfig,
);

export default createAppContainer(MainNavigator);
