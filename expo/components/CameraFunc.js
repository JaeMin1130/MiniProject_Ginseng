import { Feather, Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import App from '../App';
import PhotoPreview from './PhotoPreview';

export default function CameraFunc(props) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [toMain, setToMain] = useState(false)
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setPhoto(data.uri);
    }
  }

  return (
    toMain ? (<App />) : (
      !photo ?
        (<Camera
          ref={ref => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={'1:1'} >
          <View style={styles.buttons}>
            <View style={styles.buttonBar}>
              <Feather name="x-circle" size={50} color="black" onPress={() => setToMain(true)} />
              <Ionicons name="md-radio-button-on" size={100} color="white" onPress={() => takePicture()} />
              <Ionicons name="camera-reverse-outline" size={50} color="black" onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }} />
            </View>
          </View>
        </Camera>
        ) : (
          <PhotoPreview photo={photo} />
        )

    ));
}
const styles = StyleSheet.create({
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttons: {
    width: "45%",
    position: 'absolute',
    bottom: 10
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
})