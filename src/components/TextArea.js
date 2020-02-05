import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

import {COLORS} from '../constants';

export const TextArea = props => {
  return (
    <View style={{...s.TextAreaWrapper, ...props.style}}>
      <TextInput
        multiline
        style={s.TextArea}
        numberOfLines={4}
        onChangeText={text => props.onChangeText(text)}
        value={props.value}
      />
    </View>
  );
};

const s = StyleSheet.create({
  TextAreaWrapper: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.DARK_3,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 4,
  },
  TextArea: {paddingVertical: 8, paddingHorizontal: 15},
});
