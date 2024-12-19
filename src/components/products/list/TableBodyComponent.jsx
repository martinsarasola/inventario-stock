import { Box, TableBody, TableCell, TableRow } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function TableBodyComponent({
  rows,
  page,
  rowsPerPage,
  columns,
  handleOptionsClick,
  handleDelete,
}) {
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
  return (
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
                    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
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
  );
}
