import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from './';
import {COLORS} from '../constants';

export const Header = ({title, leftButton, rightButton}) => {
  return (
    <View style={s.Wrapper}>
      <View style={s.LeftButton}>{leftButton ? leftButton : null}</View>
      <Text textStyle={s.Title}>{title}</Text>
      <View style={s.RightButton}>{rightButton ? rightButton : null}</View>
    </View>
  );
};

const s = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    backgroundColor: COLORS.PRIMARY,
  },
  LeftButton: {
    alignItems: 'flex-end',
    width: 30,
  },
  Title: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
  RightButton: {
    width: 30,
  },
});
