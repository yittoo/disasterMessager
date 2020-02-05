import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Platform} from 'react-native';

import {COLORS} from '../constants';

export const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{...s.ButtonWrapper, ...props.style}}>
        <Text style={{...s.ButtonText, ...props.textStyle}}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  ButtonWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor:
      Platform.OS === 'ios' ? COLORS.PRIMARY_LIGHT : COLORS.PRIMARY,
  },
  ButtonText: {
    color: Platform.OS === 'ios' ? COLORS.PRIMARY : '#fff',
    textAlign: 'center',
  },
});
