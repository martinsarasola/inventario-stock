import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#414756",
    },
    delete: {
      main: "#d44029",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Desactiva mayúsculas globalmente
          fontFamily: "Arial, sans-serif", // Fuente personalizada
        },
      },
    },
  },
});

export default theme;
