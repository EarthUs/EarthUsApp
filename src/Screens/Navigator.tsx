import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {UserContext} from '~/Context/User';

import Loading from '~/Screens/Loading';

import Login from '~/Screens/Login';
import Home from '~/Screens/Home';
import Weather from '~/Screens/Weather';
import Statistics from '~/Screens/Statistics';
import Walking from '~/Screens/Walking';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

// 각 tab
const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'EarthUs',
          headerStyle: {
            backgroundColor: '#f85b00',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const WeatherTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Weather"
        component={Weather}
        options={{
          title: 'EarthUs',
          headerStyle: {
            backgroundColor: '#007fff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const StatisticsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: 'EarthUs',
          headerStyle: {
            backgroundColor: '#772fa3',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const WalkingTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Walking"
        component={Walking}
        options={{
          title: 'EarthUs',
          headerStyle: {
            backgroundColor: '#5ba800',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: true,
        inactiveBackgroundColor: '#ffffff',
        activeBackgroundColor: '#ffffff',
        activeTintColor: '#212121',
      }}>
      <BottomTab.Screen name="Home" component={HomeTab} />
      <BottomTab.Screen name="Weather" component={WeatherTab} />
      <BottomTab.Screen name="Statistics" component={StatisticsTab} />
      <BottomTab.Screen name="Walking" component={WalkingTab} />
    </BottomTab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="slide"
      // drawerContent={(props) => <CustomDrawer props={props} />}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
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
      {userInfo ? <MainNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
