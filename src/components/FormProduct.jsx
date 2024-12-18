import { Button, FormLabel, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

function FormProduct({ handleSubmit, mode, localState, setLocalState, id }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(localState);
  };

  return (
    <form
      onSubmit={(e) => {
        if (mode === "editing") {
          e.preventDefault();
          handleSubmit(id, localState);
        } else {
          e.preventDefault();
          handleSubmit();
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormLabel htmlFor="product-name">Nombre del producto:</FormLabel>
          <TextField
            id="product-name"
            type="text"
            name="name"
            value={localState.name}
            onChange={handleChange}
            fullWidth
          ></TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormLabel htmlFor="product-price">Precio del producto:</FormLabel>
          <TextField
            id="product-price"
            type="number"
            name="price"
            value={localState.price}
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
            value={localState.quantity}
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
            value={localState.category}
            onChange={handleChange}
            fullWidth
          ></TextField>
        </Grid>
        {mode === "editing" ? (
          <Grid size={{ xs: 12 }}>
            <FormLabel>Fecha de Ingreso:</FormLabel>
            <TextField
              fullWidth
              name="entryDate"
              value={localState.entryDate}
              type="datetime-local"
              onChange={handleChange}
            ></TextField>
          </Grid>
        ) : null}
        <Grid size={{ xs: 12 }}>
          <FormLabel htmlFor="product-description">
            Descripción del producto:
          </FormLabel>
          <TextField
            id="product-description"
            type="text"
            name="description"
            value={localState.description}
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
  );
}

export default FormProduct;
