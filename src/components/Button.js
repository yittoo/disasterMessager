import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import {COLORS} from '../constants';

const CustomHeaderButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={{...s.ButtonWrapper, ...props.style}}>
      <Text style={{...s.ButtonText, ...props.textStyle}}>
        {props.children}
      </Text>
    </View>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  ButtonWrapper: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ButtonText: {
    color: '#fff',
  },
});

export default CustomHeaderButton;
