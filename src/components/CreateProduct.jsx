import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  resetForm,
} from "../features/productForm/productFormSlice";
import { createProduct } from "../services/productService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function CreateProduct({ setCreatedProduct }) {
  const formState = useSelector((state) => state.productForm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const productData = {
        nombre: formState.name.trim(),
        precio: formState.price,
        cantidad: formState.quantity,
        categoria: formState.category.trim(),
        descripcion: formState.description.trim(),
      };

      if (
        !productData.nombre ||
        !productData.precio ||
        !productData.cantidad ||
        !productData.categoria ||
        !productData.descripcion
      ) {
        alert("Todos los campos son obligatorios.");
        return;
      }
      const createdProduct = await createProduct(productData);
      console.log("Producto creado: ", createdProduct);
      dispatch(resetForm());
      setCreatedProduct(createdProduct);
      alert("Producto creado.");
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      alert("Hubo un error al crear el producto: " + error.message);
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        Crear nuevo producto
      </Typography>
      <Box sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormLabel htmlFor="product-name">Nombre del producto:</FormLabel>
              <TextField
                id="product-name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                fullWidth
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormLabel htmlFor="product-price">
                Precio del producto:
              </FormLabel>
              <TextField
                id="product-price"
                type="number"
                name="price"
                value={formState.price}
                onChange={handleChange}
                fullWidth
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormLabel htmlFor="product-quantity">
                Cantidad del producto en stock:
              </FormLabel>
              <TextField
                id="product-quantity"
                type="number"
                name="quantity"
                value={formState.quantity}
                onChange={handleChange}
                fullWidth
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormLabel htmlFor="product-category">
                Categoria del producto:
              </FormLabel>
              <TextField
                id="product-category"
                type="text"
                name="category"
                value={formState.category}
                onChange={handleChange}
                fullWidth
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="product-description">
                Descripción del producto:
              </FormLabel>
              <TextField
                id="product-description"
                type="text"
                name="description"
                value={formState.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              ></TextField>
            </Grid>
            <Grid item="true" xs={12}>
              <Button type="Submit" variant="contained" color="primary">
                Guardar Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProduct;
