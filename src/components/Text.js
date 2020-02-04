import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {COLORS} from '../constants';

export const Text = ({children, textStyle, style}) => {
  return (
    <View style={{...s.Wrapper, ...style}}>
      <Text style={{...s.Text, ...textStyle}}>{children}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  Wrapper: {},
  Text: {
    color: COLORS.PRIMARY,
  },
});
