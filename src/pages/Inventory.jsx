import { Box, Typography } from "@mui/material";
import DataTable from "../components/DataTable";
import DataConfig from "../components/DataConfig";

function Inventory() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 1,
          marginRight: 5,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", alignSelf: "flex-end", marginBottom: 3 }}
          color="primary.main"
        >
          Productos
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          <DataConfig sx={{ width: "100px" }}></DataConfig>
        </Box>
      </Box>
      <DataTable></DataTable>
    </Box>
  );
}

export default Inventory;
