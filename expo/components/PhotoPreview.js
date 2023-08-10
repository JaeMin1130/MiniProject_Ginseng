import axios from 'axios';
import { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import CameraFunc from "./CameraFunc";
import CircleButton from './CircleButton';
import IconButton from './IconButton';
import ImageViewer from './ImageViewer';
export default function PhotoPreview(props) {
    const [cameraOn, setCameraOn] = useState(false);

    const predict = () => {
        console.log("start request.")
        console.log("image", props.photo)
        const file = new File([props.photo], "ginseng1");
        console.log("file", file);
        const formData = new FormData();
        formData.append("file", file);
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
                        selectedImage={props.photo}
                    />
                </View>

                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={toCamera} />
                        <CircleButton onPress={predict}/>
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                    </View>
                </View>

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
})