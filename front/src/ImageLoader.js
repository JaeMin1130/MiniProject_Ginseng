import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Fab, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import imageCompression from "browser-image-compression";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { call } from "./ApiService";

export default function ImageLoader() {
  const [imageUpload, setImageUpload] = useState([]);
  const [uploadPreview, setUploadPreview] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    console.log(imageUpload);
    console.log(uploadPreview);
  }, [imageUpload]);

  const handleImageCompress = async (file) => {
    const options = {
      maxSizeMB: 0.2, // Maximum image size
      maxWidthOrHeight: 500, // Maximum width or height
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % imageUpload.length);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + imageUpload.length) % imageUpload.length);
  };

  const handleDeletePhoto = (index, event) => {
    event.stopPropagation(); // Prevent click event from propagating to parent elements
    setImageUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      console.log(acceptedFiles);
      if (acceptedFiles && acceptedFiles.length > 0) {
        const compressedFiles = await Promise.all(acceptedFiles.map((file) => handleImageCompress(file)));
        const validCompressedFiles = compressedFiles.filter((file) => file !== null);
        setImageUpload([...imageUpload, ...validCompressedFiles]);
        setUploadPreview(validCompressedFiles.map((file) => URL.createObjectURL(file)));
      }
    },
    [imageUpload, handleImageCompress]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  let formData = new FormData();
  formData.append("imageFile", imageUpload);
  const onClickHandeler = (event) => {
    event.stopPropagation();
    console.log("click");
    call("/main/submit", "POST", imageUpload);
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center the image vertically
        aspectRatio: "1 / 1", // Make the Box container square
        border: isDragActive ? "2px solid tomato" : "2px solid grey",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {imageUpload.length > 0 ? (
        <Box
          sx={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={URL.createObjectURL(imageUpload[currentPhotoIndex])}
            alt="Uploaded"
            style={{
              transition: "opacity 0.5s",
            }}
          />
          {imageUpload.map((file, index) => (
            <IconButton
              key={index}
              onClick={(event) => handleDeletePhoto(index, event)} // Pass the event parameter to the handler
              sx={{
                position: "absolute",
                right: 1,
                top: 1,
              }}
            >
              <Fab
                color="primary"
                size="small"
                sx={{ bgcolor: "transparent", width: "30px", height: 0, borderRadius: "20%" }}
              >
                <ClearIcon fontSize="small" />
              </Fab>
            </IconButton>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <UploadIcon sx={{ fontSize: "50px" }} />
          <Typography variant="h5" alignSelf={"center"}>
            {isDragActive ? "Drop the Photo here." : "Drag a photo here."}
          </Typography>
        </Box>
      )}
      <IconButton
        sx={{
          position: "absolute",
          right: 1,
          bottom: 1,
        }}
      >
        <Fab
          color="primary"
          size="small"
          sx={{
            bgcolor: imageUpload.length > 0 ? "transparent" : "",
            width: "30px",
            height: 0,
          }}
        >
          <AddIcon fontSize="small" />
        </Fab>
      </IconButton>
      <Button variant="outlined" onClick={(event) => onClickHandeler(event)}>
        제출
      </Button>
    </Box>
  );
}
