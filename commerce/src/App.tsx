import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';

import Scanner from './screens/Scanner';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Scanner />

    </>
  );
};

export default App;
