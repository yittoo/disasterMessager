import React from 'react';
import {Platform} from 'react-native';

import {COLORS} from '../constants';

const CustomHeaderButton = props => (
  <HeaderButton
    {...props}
    backgroundColor={Platform.OS === 'ios' ? undefined : COLORS.PRIMARY}
    color={Platform.OS === 'ios' ? COLORS.PRIMARY : '#fff'}
  />
);

export default CustomHeaderButton;
