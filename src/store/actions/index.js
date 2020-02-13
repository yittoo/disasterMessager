import Contacts from 'react-native-contacts';
import {AsyncStorage} from 'react-native';

import * as ActionTypes from '../actionTypes';
import {ASYNC_STORAGE_KEYS} from '../../constants';

export const getContacts = () => dispatch => {
  dispatch(getContactsStart());
  Contacts.getAll((err, contacts) => {
    if (err === 'denied') {
      return dispatch(getContactsFail());
    }
    return dispatch(getContactsSuccess(contacts));
  });
};
const getContactsStart = () => {
  return {
    type: ActionTypes.GET_CONTACTS_START,
  };
};
const getContactsSuccess = payload => {
  return {
    type: ActionTypes.GET_CONTACTS_SUCCESS,
    payload,
  };
};
const getContactsFail = () => {
  return {
    type: ActionTypes.GET_CONTACTS_FAIL,
  };
};

export const loadSelectedContacts = () => dispatch => {
  dispatch(loadSelectedContactsStart());
  AsyncStorage.getItem(ASYNC_STORAGE_KEYS.contactCachedSelections)
    .then(res => {
      const parsedRes = JSON.parse(res);
      dispatch(loadSelectedContactsSuccess(parsedRes));
      return parsedRes;
    })
    .catch(_ => {
      return dispatch(loadSelectedContactsFail());
    });
};
const loadSelectedContactsStart = () => {
  return {
    type: ActionTypes.LOAD_SELECTED_CONTACTS_START,
  };
};
const loadSelectedContactsSuccess = payload => {
  return {
    type: ActionTypes.LOAD_SELECTED_CONTACTS_SUCCESS,
    payload,
  };
};
const loadSelectedContactsFail = () => {
  return {
    type: ActionTypes.LOAD_SELECTED_CONTACTS_FAIL,
  };
};

export const saveSelectedContacts = contacts => dispatch => {
  dispatch(saveSelectedContactsStart());
  AsyncStorage.setItem(
    ASYNC_STORAGE_KEYS.contactCachedSelections,
    JSON.stringify(contacts),
  )
    .then(_ => {
      return dispatch(saveSelectedContactsSuccess(contacts));
    })
    .catch(_ => {
      return dispatch(saveSelectedContactsFail());
    });
};
const saveSelectedContactsStart = () => {
  return {
    type: ActionTypes.SAVE_SELECTED_CONTACTS_START,
  };
};
const saveSelectedContactsSuccess = payload => {
  return {
    type: ActionTypes.SAVE_SELECTED_CONTACTS_SUCCESS,
    payload,
  };
};
const saveSelectedContactsFail = () => {
  return {
    type: ActionTypes.SAVE_SELECTED_CONTACTS_FAIL,
  };
};

export const loadScenarioMessages = () => dispatch => {
  dispatch(loadScenarioMessagesStart());
  return AsyncStorage.getItem(ASYNC_STORAGE_KEYS.scenarioMessages)
    .then(res => {
      const parsedRes = JSON.parse(res);
      dispatch(loadScenarioMessagesSuccess(parsedRes));
      return parsedRes;
    })
    .catch(_ => {
      return dispatch(loadScenarioMessagesFail());
    });
};
const loadScenarioMessagesStart = () => {
  return {
    type: ActionTypes.LOAD_SCENARIO_MESSAGES_START,
  };
};
const loadScenarioMessagesSuccess = payload => {
  return {
    type: ActionTypes.LOAD_SCENARIO_MESSAGES_SUCCESS,
    payload,
  };
};
const loadScenarioMessagesFail = () => {
  return {
    type: ActionTypes.LOAD_SCENARIO_MESSAGES_FAIL,
  };
};

export const saveScenarioMessages = scenarioMessages => dispatch => {
  dispatch(saveScenarioMessagesStart());
  return AsyncStorage.setItem(
    ASYNC_STORAGE_KEYS.scenarioMessages,
    JSON.stringify(scenarioMessages),
  )
    .then(_ => {
      return dispatch(saveScenarioMessagesSuccess(scenarioMessages));
    })
    .catch(_ => {
      return dispatch(saveScenarioMessagesFail());
    });
};
const saveScenarioMessagesStart = () => {
  return {
    type: ActionTypes.SAVE_SCENARIO_MESSAGES_START,
  };
};
const saveScenarioMessagesSuccess = payload => {
  return {
    type: ActionTypes.SAVE_SCENARIO_MESSAGES_SUCCESS,
    payload,
  };
};
const saveScenarioMessagesFail = () => {
  return {
    type: ActionTypes.SAVE_SCENARIO_MESSAGES_FAIL,
  };
};
