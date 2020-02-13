import * as ActionTypes from '../actionTypes';

const initialState = {
  contacts: null,
  loading: false,
  selectedContacts: [],
  scenarioMessages: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_CONTACTS_START:
      return {...state, loading: true};
    case ActionTypes.GET_CONTACTS_SUCCESS:
      return {...state, contacts: payload, loading: false};
    case ActionTypes.GET_CONTACTS_FAIL:
      return {...state, loading: false};
    case ActionTypes.LOAD_SELECTED_CONTACTS_START:
      return {...state, loading: true};
    case ActionTypes.LOAD_SELECTED_CONTACTS_SUCCESS:
      return {...state, selectedContacts: payload, loading: false};
    case ActionTypes.LOAD_SELECTED_CONTACTS_FAIL:
      return {...state, loading: false};
    case ActionTypes.SAVE_SELECTED_CONTACTS_START:
      return {...state, loading: true};
    case ActionTypes.SAVE_SELECTED_CONTACTS_SUCCESS:
      return {...state, selectedContacts: payload, loading: false};
    case ActionTypes.SAVE_SELECTED_CONTACTS_FAIL:
      return {...state, loading: false};
    case ActionTypes.SAVE_SCENARIO_MESSAGES_START:
      return {...state, loading: true};
    case ActionTypes.SAVE_SCENARIO_MESSAGES_SUCCESS:
      return {...state, scenarioMessages: payload, loading: false};
    case ActionTypes.SAVE_SCENARIO_MESSAGES_FAIL:
      return {...state, loading: false};
    case ActionTypes.SAVE_SCENARIO_MESSAGES_START:
      return {...state, loading: true};
    case ActionTypes.SAVE_SCENARIO_MESSAGES_SUCCESS:
      return {...state, scenarioMessages: payload, loading: false};
    case ActionTypes.SAVE_SCENARIO_MESSAGES_FAIL:
      return {...state, loading: false};
    default:
      return state;
  }
};
