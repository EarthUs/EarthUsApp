import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Styled from 'styled-components/native';

const ScrollView = Styled.ScrollView`
  background-color: ${Colors.lighter};
`;

const Body = Styled.View`
  background-color: ${Colors.white};
`;

const SectionContainer = Styled.View`
  margin-top: 32px;
  padding-horizontal:24px;
`;

const SectionDescription = Styled.Text`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.dark};
`;

const HighLight = Styled.Text`
  font-weight: 700;
`;

interface Props {}

const App = ({}: Props) => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Body>
            <SectionContainer>
              <SectionDescription>Step One</SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionDescription>
                <HighLight>Step Two</HighLight>
              </SectionDescription>
            </SectionContainer>
          </Body>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
