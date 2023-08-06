import { Box, Button, Card, CardContent, Divider, Grid, Icon, Paper, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImageLoader from "./ImageLoader";
export default function Main() {
  return (
    <Grid container spacing={1}>
      <Grid xs={12}>
        <Typography variant="h2" sx={{ my: 10, mx: 3 }}>
          진삼명삼
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <input
          type="file"
          name="files"
          id="files"
          multiple="multiple"
          onChange={(event) => console.log(event.target.value)}
        />

        <ImageLoader />
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ArrowForwardIcon sx={{ fontSize: "100px" }} />
      </Grid>
      <Grid item xs={5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center the image vertically
            aspectRatio: "1 / 1", // Make the Box container square
            border: "2px solid grey",
            borderRadius: "8px",
            position: "relative",
          }}
        ></Box>
      </Grid>
    </Grid>
  );
}
