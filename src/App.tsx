import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import Navigator from '~/Screens/Navigator';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {UserContextProvider} from '~/Context/User';
const App = () => {
  return (
    <UserContextProvider>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </UserContextProvider>
  );
};

export default App;
