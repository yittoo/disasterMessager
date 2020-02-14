import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Platform} from 'react-native';

import {COLORS} from '../constants';

export const Button = props => {
  const {disabled} = props;
  const wrapperStyles = disabled
    ? {...s.ButtonWrapper, ...props.style, ...s.Disabled}
    : {...s.ButtonWrapper, ...props.style};
  const textStyles = disabled
    ? {...s.ButtonText, ...props.textStyle, ...s.DisabledText}
    : {...s.ButtonText, ...props.textStyle};

  return (
    <TouchableOpacity onPress={!disabled ? props.onPress : () => {}}>
      <View style={wrapperStyles}>
        <Text style={textStyles}>{props.children}</Text>
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
  Disabled: {
    backgroundColor: COLORS.GRAY_1,
  },
  ButtonText: {
    color: Platform.OS === 'ios' ? COLORS.PRIMARY : '#fff',
    textAlign: 'center',
  },
  DisabledText: {
    color: COLORS.DARK_3,
  },
});
