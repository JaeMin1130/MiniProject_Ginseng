import { Box, Container, CssBaseline, createTheme } from "@mui/material";
import MainMain from "./Main";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f0f0",
    },
    primary: {
      main: "#000000",
    },
  },
  height: "100vh", // Add this line to set the height
});

  
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container >
        <MainMain />
      </Container>
    </ThemeProvider>
  );
}

export default App;
