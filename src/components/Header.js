import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants';

export const Header = props => {
  console.log(props);
  return (
    <View style={{...s.Wrapper}}>
      <View>
        <Text>Backbutton</Text>
      </View>
      <View>
        <Text>Title</Text>
      </View>
      <View>
        <Text>ForwardButton</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  Wrapper: {},
  Text: {
    color: COLORS.PRIMARY,
  },
});
