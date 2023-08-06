import { Box, Container, CssBaseline, createTheme } from "@mui/material";
import Main from "./Main";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
  palette: {
    background: {
      default: "#f0f0f0",
    },
    primary: {
      main: "#000000",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Main />
      </Container>
    </ThemeProvider>
  );
}

export default App;
