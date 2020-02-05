import React from 'react';
import {View, Text as NativeText, StyleSheet} from 'react-native';

import {COLORS} from '../constants';

export const Text = ({children, textStyle, style}) => {
  return (
    <View style={{...s.Wrapper, ...style}}>
      <NativeText style={{...s.Text, ...textStyle}}>{children}</NativeText>
    </View>
  );
};

const s = StyleSheet.create({
  Wrapper: {},
  Text: {
    color: COLORS.PRIMARY,
  },
});
