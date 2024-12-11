import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  initializeForm,
  resetForm,
  updateField,
} from "../features/productForm/productFormSlice";

export default function StickyHeadTable({
  setCategories,
  selectedCategorie,
  loading,
  setLoading,
  createdProduct,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const columns = [
    { id: "options", label: "", minWidth: 10, align: "center" },
    { id: "nombre", label: "Nombre", minWidth: 130 },
    { id: "descripcion", label: "Descripcion", minWidth: 100 },
    {
      id: "precio",
      label: "Precio",
      minWidth: 80,
      align: "left",
    },
    {
      id: "cantidad",
      label: "Cantidad",
      minWidth: 80,
      align: "left",
    },
    {
      id: "categoria",
      label: "Categoria",
      minWidth: 90,
      align: "left",
    },
    {
      id: "fechaIngreso",
      label: "Fecha de Ingreso",
      minWidth: 50,
      align: "center",
    },
    ...(isLargeScreen ? [{ id: "delete", label: "", align: "center" }] : []),
  ];

  useEffect(() => {
    if (page > Math.floor(rows.length / rowsPerPage)) {
      setPage(Math.max(0, Math.floor(rows.length / rowsPerPage)));
    }
  }, [rows, rowsPerPage, page]);

  const formState = useSelector((state) => state.productForm);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url = "https://stock-api-beta.vercel.app/api/productos/";
        if (selectedCategorie && selectedCategorie !== "Todos") {
          console.log(selectedCategorie);
          url = `https://stock-api-beta.vercel.app/api/productos/categoria/${selectedCategorie}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }
        const fetchedData = await response.json();
        setRows(fetchedData);

        const fetchedCategories = new Set(
          fetchedData.map((item) => item.categoria)
        );

        const uniqueCategories = [...fetchedCategories];
        if (url === "https://stock-api-beta.vercel.app/api/productos/") {
          setCategories(uniqueCategories);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedCategorie, createdProduct, updatedProduct, deletedProduct]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          mt: 2,
        }}
      >
        <CircularProgress sx={{ textAlign: "center" }} />
      </Box>
    );
  if (error) return <Typography>Error: {error}</Typography>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleOptionsClick = (e, product) => {
    setAnchorEl(e.currentTarget);
    setSelectedProduct(product);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleUpdateOption = () => {
    handleClosePopover();
    const formattedDate = new Date(selectedProduct.fechaIngreso)
      .toISOString()
      .slice(0, 16);
    dispatch(
      initializeForm({
        name: selectedProduct.nombre,
        description: selectedProduct.descripcion,
        price: selectedProduct.precio,
        quantity: selectedProduct.cantidad,
        category: selectedProduct.categoria,
        entryDate: formattedDate,
        isEditing: true,
      })
    );
    setModalOpen(true);
    console.log(selectedProduct);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    dispatch(resetForm());
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar el producto?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `https://stock-api-beta.vercel.app/api/productos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("No se pudo eliminar el objeto");
      setDeletedProduct(id);
      setLoading(true);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdateSubmit = async (id) => {
    setModalOpen(false);
    try {
      const updatedProductData = {
        nombre: formState.name.trim(),
        precio: formState.price,
        cantidad: formState.quantity,
        categoria:
          formState.category.trim().charAt(0).toLowerCase() +
          formState.category.slice(1).toLowerCase(),
        descripcion: formState.description.trim(),
        fechaIngreso: formState.entryDate,
      };

      console.log("Objeto pasado: ", updatedProductData);

      const response = await fetch(
        `https://stock-api-beta.vercel.app/api/productos/actualizar-producto/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProductData),
        }
      );
      handleCloseModal();
      setLoading(true);
      const updatedProductResponse = await response.json();
      console.log("producto actualizado: ", updatedProductResponse);

      setUpdatedProduct(updatedProductResponse);
    } catch (error) {
      console.error("Error: ", error.message);
      throw error;
    }
  };

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    const formattedTime = date.toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });

    return { date: formattedDate, time: formattedTime };
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 446 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "options" ? (
                          <MoreHorizIcon
                            color="secondary"
                            sx={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleOptionsClick(e, row);
                            }}
                          />
                        ) : column.id === "delete" ? (
                          <DeleteForeverIcon
                            color="delete"
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDelete(row._id);
                            }}
                          />
                        ) : column.id === "descripcion" ? (
                          <Box
                            sx={{
                              maxHeight: "40px",
                              overflowY: "auto",
                              whiteSpace: "normal",
                            }}
                          >
                            {value}
                          </Box>
                        ) : column.id === "precio" ? (
                          value + " $"
                        ) : column.id === "categoria" ? (
                          value.charAt(0).toUpperCase() +
                          value.slice(1).toLowerCase()
                        ) : column.id === "fechaIngreso" ? (
                          <>
                            <Box>{formatDateTime(value).date}</Box>
                            <Box>{formatDateTime(value).time}</Box>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleUpdateOption}>Editar</MenuItem>
        {!isLargeScreen ? (
          <MenuItem
            onClick={() => {
              handleDelete(selectedProduct._id);
              handleClosePopover();
            }}
          >
            Eliminar
          </MenuItem>
        ) : null}
      </Popover>
      <Box>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "84vh",
              overflowY: { xs: "auto", md: "hidden" },
              minWidth: { xs: "200px" },
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "secondary.main",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mb: 3, color: "primary.main" }}
            >
              Actualice el producto:
            </Typography>
            <form
              id="modal-modal-description"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSubmit(selectedProduct._id);
              }}
            >
              <Grid container spacing={1.3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormLabel>Nombre:</FormLabel>
                  <TextField
                    fullWidth
                    name="name"
                    value={formState.name}
                    type="text"
                    onChange={handleModalFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormLabel>Precio:</FormLabel>
                  <TextField
                    fullWidth
                    name="price"
                    value={formState.price}
                    type="number"
                    onChange={handleModalFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormLabel>Cantidad:</FormLabel>
                  <TextField
                    fullWidth
                    name="quantity"
                    value={formState.quantity}
                    type="number"
                    onChange={handleModalFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormLabel>Categoría:</FormLabel>
                  <TextField
                    fullWidth
                    name="category"
                    value={formState.category}
                    type="text"
                    onChange={handleModalFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormLabel>Fecha de Ingreso:</FormLabel>
                  <TextField
                    fullWidth
                    name="entryDate"
                    value={formState.entryDate}
                    type="datetime-local"
                    onChange={handleModalFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormLabel>Descripción</FormLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    value={formState.description}
                    type="text"
                    onChange={handleModalFormChange}
                  ></TextField>
                </Grid>
                <Grid item="true" size={{ xs: 12 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Actualizar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </Box>
    </Paper>
  );
}
