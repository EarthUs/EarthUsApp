import React, {useContext, useLayoutEffect, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';

import {UserContext} from '~/Context/User';
import {Text} from 'react-native';

const Container = Styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;

type NavigationProp = StackNavigationProp<MainNaviParamList, 'Home'>;
interface Props {
  navigation: NavigationProp;
}

const Home = ({navigation}: Props) => {
  const {logout} = useContext<IUserContext>(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <StyleButton
          onPress={() => {
            logout();
          }}>
          <Icon source={require('~/Assets/Images/ic_logout.png')} />
        </StyleButton>
      ),
    });
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Container>
      <Text>Hi</Text>
    </Container>
  );
};

export default Home;
