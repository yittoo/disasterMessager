import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';

import Navigator from './src/navigation';
import store from './src/store/createStore';
import {loadSelectedContacts} from './src/store/actions';

const App = () => {
  return (
    <Provider store={store}>
      <Init />
    </Provider>
  );
};

const Init = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSelectedContacts());
  }, []);

  return <Navigator />;
};

export default App;
