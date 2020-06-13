import React, { Component } from "react";
import { LayoutAnimation, View, Text } from "react-native";

export default class FeedScreen extends Component {
  returnData=[];
  componentDidMount() {
    fetch("http://15.164.160.137:8080/feeds/countfortype", {
        headers: {
          "Content-Type": 'application/json',
        },
        method: "GET"
      }).then(response => response.json())
        .then(json => {
          resultData = json;
          console.log(resultData);
          return json;
      });
  }
  render() {
    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    return (
      <View>
          <Text>지역별 수거 정보</Text>
          <Text>종류별 수거 정보</Text>
      </View>
    );
  }
}
