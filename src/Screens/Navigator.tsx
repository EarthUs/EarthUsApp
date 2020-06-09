import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTab} from '@react-navigation/material-top-tabs';

import {UserContext} from '~/Context/User';

import Loading from '~/Screens/Loading';

import Login from'~/Screens/Login';
import Home from'~/Screens/Home';
import Weather from'~/Screens/Weather';
import Statistics from'~/Screens/Statistics';
import Walking from'~/Screens/Walking';

const TopTab = createMaterialTopTab();

const LoginNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
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
    </TopTab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'blue'},
      }}>
      <TopTab.Screen name="Home" component={Home} />
      <TopTab.Screen name="Weather" component={Weather} />
      <TopTab.Screen name="Statistics" component={Statistics} />
      <TopTab.Screen
        name="Walking"
        component={Walking}
        options={{tabBarLabel: 'Walking'}}
      />
    </TopTab.Navigator>
  );
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);
  console.log(isLoading);
  console.log(userInfo);
  if (isLoading == false) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {userInfo ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
