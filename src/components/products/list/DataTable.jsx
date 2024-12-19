import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../../services/productService";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {
  initializeForm,
  resetForm,
} from "../../../features/productForm/productFormSlice";
import TableHeadComponent from "./TableHeadComponent";
import TableBodyComponent from "./TableBodyComponent";
import useFetchProducts from "../../hooks/useFetchProducts";
import useProductActions from "../../hooks/useProductActions";
import UpdateProduct from "../update/UpdateProduct";

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
  const [selectedProduct, setSelectedProduct] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const columns = [
    { id: "options", label: "", minWidth: 10, align: "center" },
    { id: "nombre", label: "Nombre", minWidth: 130 },
    { id: "descripcion", label: "Descripción", minWidth: 100 },
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
      label: "Categoría",
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

  const formState = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const [updateLocalState, setUpdateLocalState] = useState(formState);

  useEffect(() => {
    setUpdateLocalState(formState);
  }, [formState]);

  useFetchProducts(
    selectedCategorie,
    setRows,
    setCategories,
    setLoading,
    setError,
    createdProduct,
    updatedProduct,
    deletedProduct
  );

  useEffect(() => {
    setPage(0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [selectedCategorie]);

  const { handleDelete } = useProductActions(
    setDeletedProduct,
    setRows,
    setLoading,
    rows,
    rowsPerPage,
    page,
    setPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 446 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeadComponent columns={columns} />
          <TableBodyComponent
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            columns={columns}
            handleOptionsClick={handleOptionsClick}
            handleDelete={handleDelete}
          />
        </Table>
      </TableContainer>
      {rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={Math.max(
            0,
            Math.min(page, Math.ceil(rows.length / rowsPerPage) - 1)
          )}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {rows.length === 0 && (
        <Typography sx={{ margin: 3 }}>
          No hay productos disponibles.
        </Typography>
      )}

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
          <Box>
            <UpdateProduct
              setModalOpen={setModalOpen}
              updateProduct={updateProduct}
              handleCloseModal={handleCloseModal}
              setLoading={setLoading}
              setUpdatedProduct={setUpdatedProduct}
              updateLocalState={updateLocalState}
              setUpdateLocalState={setUpdateLocalState}
              selectedProduct={selectedProduct}
            />
          </Box>
        </Modal>
      </Box>
    </Paper>
  );
}
