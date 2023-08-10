import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import CameraFunc from "./components/CameraFunc";
import axios from "axios";

export default function App(props) {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(props.selectedImage);
  const [cameraOn, setCameraOn] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };
  const onReset = () => {
    setShowAppOptions(!showAppOptions);
    setSelectedImage(null);
  };

  const predict = () => {
    
    console.log("start request.")
    console.log("image", selectedImage)
    const splitedFile = selectedImage.split("/")
    const filename = splitedFile.pop()
    const uri = splitedFile.join("/").replace("///", "")
    console.log("uri", uri)
    const formData = new FormData();
    formData.append("file", {uri:uri, name:filename, type:"image/jpeg"});

    console.log("start axios")
    axios
      .post(`http://172.30.1.15:5000/fileupload`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          console.log("response", err)
        } else if (err.request) {
          console.log("request", err)
        } else {
          console.log("anything else", err)
        }
      });
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const toCamera = () => {
    setCameraOn(!cameraOn)
  }
  return (
    cameraOn ? (
      <CameraFunc />
    ) :
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            selectedImage={selectedImage}
          />
        </View>

        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={predict} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button label="사진 선택" onPress={pickImageAsync} iconName={"picture-o"} />
            <Button label="사진 촬영" onPress={toCamera} iconName={"camera"}/>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    marginTop:"30px"
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  subFooterContainer: {
    display: "flex",
    flexDirection: "row"
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
