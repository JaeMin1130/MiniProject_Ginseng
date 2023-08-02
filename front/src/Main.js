import { Box, Button, Card, CardContent, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Main() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone(console.log("picture"));
  return (
    <Grid container spacing={5}>
      <Grid xs={12}>
        <Typography variant="h2" sx={{ mt: 10, mx: 3 }}>
          인삼 판별
        </Typography>
      </Grid>
      <Divider />
      <Grid item xs={5}>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed grey",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              height: "300px",
            }}
          >
            <Typography variant="h5" sx={{ my: 3 }}>
              {isDragActive ? "Drop the picture here" : "Drag and drop your Ginseng"}
            </Typography>
            <Button variant="outlined" color="primary">
              Select Picture
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Card variant="outlined" sx={{ height: "300px" }}>
          <CardContent>
            <Typography sx={{ fontSize: 20, fontWeight: "bolder", my: 3 }} color="text.secondary" gutterBottom>
              인삼 정보 입력
            </Typography>
            <Grid container spacing={1}>
              <Grid xs={6}>
                <TextField id="outlined-basic" label="재배지역" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="수확시기" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="습도" variant="outlined" fullWidth />
              </Grid>
              <Grid xs={6}>
                <TextField id="outlined-basic" label="value1" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="value2" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="value3" variant="outlined" fullWidth />
                <Box sx={{ my: 1, display: "flex", justifyContent: "end" }}>
                  <Button variant="outlined">판별하기</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
