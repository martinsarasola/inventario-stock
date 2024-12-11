import { Outlet, Link } from "react-router-dom";
import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Layout() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" flexGrow={1}>
            Stock de Inventario
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: "200px", padding: 2 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              backgroundColor: "primary.main",
              borderRadius: 1,
              color: "white",
              padding: 0.5,
            }}
          >
            Menú
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 1,
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{ justifyContent: "flex-start", fontSize: "1.2rem" }}
              onClick={handleDrawerToggle}
            >
              <HomeOutlinedIcon sx={{ mr: 1.5, fontSize: "1.7rem" }} /> Home
            </Button>
            <Button
              component={Link}
              to="/inventory/productos"
              sx={{ justifyContent: "flex-start", fontSize: "1.2rem" }}
              onClick={handleDrawerToggle}
            >
              <HomeOutlinedIcon sx={{ mr: 1.5, fontSize: "1.7rem" }} />{" "}
              Inventario
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Box sx={{ width: "100%", mt: 9 }}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

export default Layout;
