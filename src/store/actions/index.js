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
      return dispatch(loadSelectedContactsSuccess(parsedRes));
    })
    .catch(err => {
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
    .then(res => {
      return dispatch(saveSelectedContactsSuccess(contacts));
    })
    .catch(err => {
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
