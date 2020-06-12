import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'earthus-90e16';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyA0Ts68-a6uv8WtppxD1PTKhhr84NY0_a4",
      authDomain: "earthus-90e16.firebaseapp.com",
      databaseURL: "https://earthus-90e16.firebaseio.com",
      projectId: "earthus-90e16",
      storageBucket: "earthus-90e16.appspot.com",
      messagingSenderId: "715002742933",
      appId: "1:715002742933:web:a23a69b13a9674cfdd739c",
      measurementId: "G-N9529T7NSZ"
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      await this.collection.add({
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
      }).then(() => {
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
            image_class = JSON.stringify(json);
            return Promise.resolve(image_class);
          });
      });


    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
