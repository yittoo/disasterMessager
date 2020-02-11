import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';

import Navigator from './src/navigation';
import store from './src/store/createStore';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
