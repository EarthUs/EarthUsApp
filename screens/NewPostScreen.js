import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import uuid from 'uuid';

import uploadPhoto from '../utils/uploadPhoto';
import shrinkImageAsync from '../utils/shrinkImageAsync';
import Fire from '../Fire';

const collectionName = 'earthus-90e16';
image_class = "loading classifier";

export default class NewPostScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
        <HeaderButtons.Item
          title="Share"
          onPress={() => {
            const text = navigation.getParam('text');
            const image = navigation.getParam('image');
            if (text && image) {
              navigation.goBack();
              Fire.shared.post({ text: text.trim(), image });
            } else {
              alert('Need valid description');
            }
          }}
        />
      </HeaderButtons>
    ),
  });

  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  componentDidMount = async() => {
        const { image : localUri } = await this.props.navigation.state.params;
        try {
          const { uri: reducedImage, width, height } = await shrinkImageAsync(
            localUri,
          );
    
          const remoteUri = await this.uploadPhotoAsync(reducedImage);
            console.log("Document written Uri: " + remoteUri);
            const body = new FormData
            body.append("url", remoteUri)
            body.append("", "\\")
            body.append("classifier_ids", "garbage_1414697122")
            body.append("", "\\")
    
            fetch("https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/54d6afb1-4cee-4741-978c-bfd607d86702/v3/classify?version=2018-03-19", {
              body,
              headers: {
                Authorization: "Basic YXBpa2V5OjlKQWxsZk1uOEpjdk9pank0M0Q3dngwbC1keVNzbC1fMmFmOXVuQVYtVnph",
                "Content-Type": "multipart/form-data"
              },
              method: "POST"
            })
              .then(response => response.json())
              .then(json => {
                // 받은 json으로 기능 구현
                image_class = json.images[0].classifiers[0].classes[0].class; 
                this.props.navigation.setParams({image_class})
                alert(image_class);
              });
    
    
        } catch ({ message }) {
          alert(message);
        }
}

  state = { text: '' };

  render() {
    const { image } = this.props.navigation.state.params;
    return (
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder={image_class}
          onChangeText={text => {
            this.setState({ text });
            this.props.navigation.setParams({ text });
          }}
        />
      </View>
    );
  }
}
