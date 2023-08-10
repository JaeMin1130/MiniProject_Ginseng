import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Fab, IconButton, Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import imageCompression from "browser-image-compression";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { call } from "./ApiService";
import axios from "axios";

export default function ImageLoader(props) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  
  const handleDeletePhoto = (index, event) => {
    event.stopPropagation();
    props.setImageUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
    props.setIsUploaded(false);
    props.setImage();
    props.setGrade("");
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        props.setImageUpload([...props.imageUpload, ...acceptedFiles]);
        props.setFileName(acceptedFiles[0].name);
        props.setFileType(acceptedFiles[0].type);
        props.setIsUploaded(true); // Set the flag when an image is uploaded
      }
    },
    [props.imageUpload]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          height:"70vh",
          maxHeight:"70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center the image vertically
          aspectRatio: "1 / 1.3", // Make the Box container square
          border: isDragActive ? "2px solid tomato" : "2px solid grey",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        {props.imageUpload.length > 0 ? (
          <Box
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={URL.createObjectURL(props.imageUpload[currentPhotoIndex])}
              alt="Uploaded"
              style={{
                transition: "opacity 0.5s",
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            {props.imageUpload.map((file, index) => (
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
              bgcolor: props.imageUpload.length > 0 ? "transparent" : "",
              width: "30px",
              height: 0,
            }}
          >
            <AddIcon fontSize="small" />
          </Fab>
        </IconButton>
      </Box>
        {/* <Button type="submit"  variant="outlined" onClick={(event) => onClickHandeler(event)}>
          제출
        </Button> */}
    </Box>
  );
}
