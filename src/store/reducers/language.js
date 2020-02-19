import * as ActionTypes from '../actionTypes';

const languageOptions = {
  ENG: {
    label: 'English',
    value: 'ENG', // always keep it same to KEY from parent
  },
};

const initialState = {
  loading: false,
  currentChosen: languageOptions.ENG.value,
  options: languageOptions,
  views: {
    ContactsSelector: {
      [languageOptions.ENG]: {
        // TODO FIX CRASH ON EMPTY CONTACTS
      },
    },
    EditMessages: {
      [languageOptions.ENG]: {
        options: {
          /* TODO */
        },
        defaultMessages: {
          /* TODO */
        },
        cancelButton: 'Cancel Change',
        defaultButton: 'Default',
        saveButton: 'Save Scenario',
      },
    },
    Sms: {
      [languageOptions.ENG]: {
        selectContactsTitle: 'Select Contacts (Currently Chosen: ',
        selectMessageTitle: 'Please select message to send',
        options: {
          /* TODO */
        },
        messagePreviewTitle: 'Message Preview',
        submitButton: 'Send the message to all chosen contacts',
        submitButtonNoContacts: 'No contacts chosen',
      },
    },
    ShareOnOtherApps: {
      [languageOptions.ENG]: {
        selectMessageTitle: 'Please select message to share',
        messagePreviewTitle: 'Message Preview',
        options: {
          /* TODO */
        },
        submitButton: 'Share on another app',
      },
    },
    Settings: {
      [languageOptions.ENG]: {
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
