import Contacts from 'react-native-contacts';

import * as ActionTypes from '../actionTypes';

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
