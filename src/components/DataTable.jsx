import { useState, useEffect } from "react";
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

const columns = [
  { id: "delete", label: "", minWidth: 0 },
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
    minWidth: 120,
    align: "left",
  },
];

export default function StickyHeadTable({ setCategories, selectedCategorie }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        {
          url == "https://stock-api-beta.vercel.app/api/productos/"
            ? setCategories(uniqueCategories)
            : null;
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedCategorie]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

      setRows((prevRows) => prevRows.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
                        {column.id === "delete" ? (
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
    </Paper>
  );
}
