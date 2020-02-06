import {Dimensions} from 'react-native';

export const COLORS = {
  PRIMARY: '#a901db',
  PRIMARY_DARK: '#7e2d7b',
  PRIMARY_LIGHT: '#f8e0f7',

  SECONDARY: '#04b4ae',
  SECONDARY_LIGHT: 'effbfb',

  WHITE: '#ffffff',

  DARK_1: '#333333',
  DARK_2: '#555555',
  DARK_3: '#777777',

  GRAY_1: '#ccc',
};

export const DEFAULT_VIEW_STYLE = {
  paddingHorizontal: 10,
  backgroundColor: COLORS.PRIMARY_LIGHT,
  minHeight: Dimensions.get('window').height,
};

export const ROUTE_NAMES = {
  Home: 'Home',
  ContactSelector: 'ContactSelector',
};

export const ASYNC_STORAGE_KEYS = {
  scenarioMessages: 'scenarioMessages',
  contactsPermissionsGiven: 'contactPermissions',
};

export const SCENARIO_MESSAGE_KEYS = {
  GOOD: 'good',
  BAD: 'bad',
};
