import { Box, Typography } from "@mui/material";
import DataTable from "../components/DataTable";
import DataConfig from "../components/DataConfig";
import { useState } from "react";

function Inventory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("Todos");
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 1,
          marginRight: 5,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", alignSelf: "center" }}
          color="primary.main"
        >
          Productos
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          <DataConfig
            sx={{ width: "100px" }}
            categories={categories}
            selectedCategorie={selectedCategorie}
            setSelectedCategorie={setSelectedCategorie}
          ></DataConfig>
        </Box>
      </Box>
      <DataTable
        setCategories={setCategories}
        selectedCategorie={selectedCategorie}
      ></DataTable>
    </Box>
  );
}

export default Inventory;
