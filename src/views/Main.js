import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export const Main = props => {
  console.log(JSON.stringify(props.navigation, null, 2));
  return (
    <View>
      <Text>Main</Text>
      <Text>Main</Text>
      <Text>Main</Text>
      <Text>Main</Text>
    </View>
  );
};

Main.navigationOptions = ({navigation}) => {
  return {};
};

const s = StyleSheet.create({});
