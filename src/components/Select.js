import React from 'react';
import {View, StyleSheet} from 'react-native';
import RnPickerSelect from 'react-native-picker-select';

import {COLORS} from '../constants';

export const Select = props => (
  <View style={{...s.Wrapper, ...props.style}}>
    <RnPickerSelect
      {...props}
      style={{inputAndroid: {...s.Select, ...props.selectStyle}}}
    />
  </View>
);

const s = StyleSheet.create({
  Wrapper: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY_1,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  Select: {
    color: COLORS.PRIMARY,
  },
});
