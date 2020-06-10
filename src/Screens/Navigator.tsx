import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {UserContext} from '~/Context/User';

import Loading from '~/Screens/Loading';

import Login from'~/Screens/Login';
import Home from'~/Screens/Home';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'EarthUs',
          headerTransparent: true,
          headerTintColor: '#E70915',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTintColor: '#E70915',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);
  console.log(isLoading);
  console.log(userInfo);
  if (isLoading === false) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {userInfo ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
