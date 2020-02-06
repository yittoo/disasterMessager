import * as ActionTypes from '../actionTypes';

const initialState = {
  contacts: null,
  loading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_CONTACTS_START:
      return {...state, loading: true};
    case ActionTypes.GET_CONTACTS_SUCCESS:
      return {...state, contacts: payload, loading: false};
    case ActionTypes.GET_CONTACTS_FAIL:
      return {...state, loading: false};
    default:
      return state;
  }
};
