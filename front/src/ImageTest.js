import { Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ImageTest() {
  const [targetFile, setTargetFile] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file", e.target.files[0]);
    setTargetFile(file);
  };

  const onSubmit = () => {
    console.log(targetFile);
    const formData = new FormData();
    formData.append("file", targetFile);

    axios
      .post("http://localhost:5000/fileUpload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <input type="file" name="file" onChange={(e) => handleFileChange(e)} />
      <Button onClick={onSubmit}>제출</Button>
    </Box>
  );
}
