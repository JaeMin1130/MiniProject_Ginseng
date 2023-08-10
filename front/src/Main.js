import { Box, Button, Card, CardContent, Divider, Fab, Grid, Icon, IconButton, Paper, Skeleton, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImageLoader from "./ImageLoader";
import { useState } from "react";
import years4 from "./img/years4.png"
import years5 from "./img/years5.png"
import years6 from "./img/years6.png"
import axios from "axios";
import "./submitButton.css"; // Import the CSS file
import PropTypes from 'prop-types';

function Main(props) {
  const { loading = false } = props;
  const [grade, setGrade] = useState("")
  const [imageUpload, setImageUpload] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [image, setImage] = useState()
  const [isUploaded, setIsUploaded] = useState(false);
  const markList = [years4, years5, years6]

  const onClickHandeler = (event) => {
    event.stopPropagation();
    setIsUploaded(!isUploaded)
    setImage(imageUpload[0])
    // Blob -> File(Blob으로 보내니까 filename을 못 읽음)
    const file = new File([imageUpload[0]], fileName, {
      type: fileType,
    });
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/fileupload", formData)
      .then((res) => {
        setGrade(res.data)
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    loading ? (<Skeleton animation="wave" variant="rectangle" width={"400px"} height={"100vh"} />)
    
    :(<Box sx={{ height: "100vh" }}>
      <Grid container spacing={1} >
        <Grid xs={5}>
          <Typography variant="h2" sx={{ my: 5, mx: 3 }}>
            Before : ???
          </Typography>
        </Grid>
        <Grid xs={2}></Grid>
        <Grid xs={5}>
          <Typography variant="h2" sx={{ my: 5, mx: 3 }}>
            After : {grade.length == 0 ? "???" : grade}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <ImageLoader setGrade={setGrade} setImage={setImage} setIsUploaded={setIsUploaded} imageUpload={imageUpload} setImageUpload={setImageUpload} fileName={fileName} setFileName={setFileName} fileType={fileType} setFileType={setFileType} />
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
          <IconButton className={isUploaded ? "submitButton" : ""}
            onClick={(event) => onClickHandeler(event)}
          >
            <ArrowForwardIcon sx={{ fontSize: "100px" }} />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Center the image vertically
              aspectRatio: "1 / 1.3", // Make the Box container square
              border: "2px solid grey",
              borderRadius: "8px",
              position: "relative",
            }}
          >{image && (<Box
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              style={{
                transition: "opacity 0.5s",
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            <img
              src={markList[grade[0] - 4]}
              alt="Uploaded"
              style={{
                position: "absolute",
                right: 1,
                top: 1,
                width: "20%"
              }}
            />
          </Box>)}
          </Box>
        </Grid>
      </Grid>
    </Box>) )
}

Main.propTypes = {
  loading: PropTypes.bool,
};

export default function MainMain() {
  return (
      <Main/>
  );
}

