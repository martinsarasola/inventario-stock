import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "60vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" sx={{ color: "primary.main" }}>
        Bienvenido
      </Typography>
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        Elija su inventario
      </Typography>
      <Button
        component={Link}
        to="/inventory"
        sx={{ fontSize: "large", backgroundColor: "#e3f0ff", mt: 2 }}
      >
        Productos
      </Button>
    </Box>
  );
}

export default Home;
