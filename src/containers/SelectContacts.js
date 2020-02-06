import React, {useState, useEffect} from 'react';
import {View, StyleSheet, CheckBox, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {Text, Button} from '../components';
import {COLORS} from '../constants';

const SelectContacts = props => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const contacts = useSelector(state => state.defaultReducer.contacts);

  useEffect(() => {
    const contactsReducedAndFiltered = contacts
      .map(c => {
        if (c.phoneNumbers && c.phoneNumbers[0]) {
          return {
            id: c.recordID,
            name: c.displayName,
            phone: c.phoneNumbers[0].number,
            checked: false,
          };
        } else {
          return null;
        }
      })
      .filter(c => !!c);
    setContactsData(contactsReducedAndFiltered);
  }, [contacts]);

  const onCheckboxChange = id => {
    const indexOfGivenId = contactsData.findIndex(c => c.id === id);
    if (indexOfGivenId !== -1) {
      const copyContactsData = [...contactsData];
      const oldValue = {...contactsData[indexOfGivenId]};
      oldValue.checked = !oldValue.checked;
      copyContactsData.splice(indexOfGivenId, 1, oldValue);
      setContactsData(copyContactsData);
    }
  };

  const uncheckAllCheckboxes = () => {
    const copyContactsData = contactsData.map(c => ({...c, checked: false}));
    setContactsData(copyContactsData);
    setSelectedContacts([]);
  };

  // TODO SEARCH NAME

  // console.log(JSON.stringify(contacts, null, 2));
  return (
    <View style={s.Contacts}>
      <View style={s.ContactsList}>
        <FlatList
          keyExtractor={c => c.id}
          renderItem={({item}) => (
            <Contact
              name={item.name}
              phone={item.phone}
              checked={item.checked}
              onChange={() => onCheckboxChange(item.id)}
            />
          )}
          data={contactsData}
        />
      </View>
      <View style={s.ButtonsWrapper}>
        <Button style={s.Button}>Save</Button>
        <Button style={s.Button} onPress={uncheckAllCheckboxes}>
          Clear
        </Button>
      </View>
    </View>
  );
};

const Contact = ({name, checked, onChange, phone}) => (
  <View style={s.Contact}>
    <View>
      <CheckBox value={checked} onValueChange={onChange} />
    </View>
    <Text style={s.Contact__Name}>{name}</Text>
    <Text>{phone}</Text>
  </View>
);

const s = StyleSheet.create({
  Contacts: {
    flex: 1,
    marginVertical: 10,
  },
  ButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexBasis: 130,
    marginTop: 10,
  },
  Button: {
    marginHorizontal: 10,
    width: 100,
  },
  ContactsList: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE + '88',
    borderColor: COLORS.GRAY_1,
    borderWidth: 1,
    marginBottom: 0,
  },
  Contact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_1,
    // borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
    // marginVertical: 1,
  },
  Contact__Name: {
    flex: 1,
  },
});

export default SelectContacts;
