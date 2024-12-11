import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",

        height: "80vh",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "90vw" }}>
        <Typography sx={{ fontSize: "2rem" }}>
          Lo sentimos, no podemos encontrar la página que buscas.
        </Typography>
        <Typography variant="h3">Error 404...</Typography>
      </Box>
    </Box>
  );
}

export default NotFound;
