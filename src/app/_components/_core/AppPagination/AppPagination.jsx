import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

const AppPagination = ({  current_page,
                          current_rowsPerPage,
                          totalRows,
                          onHandleChangePage
                      }) => {

  //console.log("==", current_page, current_rowsPerPage, totalRows);

  const [page, setPage] = React.useState(current_page);
  const [rowsPerPage, setRowsPerPage] = React.useState(current_rowsPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    onHandleChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalRows}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[]}
    />
  );
};

export { AppPagination };
