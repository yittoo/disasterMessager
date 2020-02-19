import * as ActionTypes from '../actionTypes';

const initialState = {
  loading: false,
  currentChosen: 'en',
  views: {
    ContactsSelector: {
      en: {},
    },
    EditMessages: {
      en: {},
    },
    Sms: {
      en: {},
    },
    ShareOnOtherApps: {
      en: {},
    },
    Settings: {
      en: {
        languageTitle: 'Language',
        save: 'Save',
      },
    },
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    default:
      return state;
  }
};
