import { Box, Typography } from "@mui/material";
import DataTable from "../components/DataTable";
import DataConfig from "../components/DataConfig";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import CreateProduct from "../components/CreateProduct";
import { ToastContainer } from "react-toastify";

function Inventory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("Todos");
  const [createdProduct, setCreatedProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <Box sx={{ width: "90vw", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { sx: "flex-start", sm: "center" },
          marginLeft: 1,
          marginRight: 1,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            alignSelf: { sx: "flex-start", sm: "flex-end" },
          }}
          color="primary.main"
        >
          Productos
        </Typography>
        {!loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 170,
              mt: 1,
              marginRight: { xs: "0px", sm: 1 },
            }}
          >
            <DataConfig
              sx={{ width: "100px" }}
              categories={categories}
              selectedCategorie={selectedCategorie}
              setSelectedCategorie={setSelectedCategorie}
            ></DataConfig>
            <FilterAltIcon
              fontSize="large"
              sx={{ alignSelf: "flex-end" }}
              color="secondary"
            />
          </Box>
        ) : null}
      </Box>
      <DataTable
        setCategories={setCategories}
        selectedCategorie={selectedCategorie}
        loading={loading}
        setLoading={setLoading}
        createdProduct={createdProduct}
      ></DataTable>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        {!loading ? (
          <CreateProduct setCreatedProduct={setCreatedProduct}></CreateProduct>
        ) : null}
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default Inventory;
