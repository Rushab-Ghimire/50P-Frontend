// TransactionsList.jsx
import React, { useState, useRef } from "react";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Tooltip,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete,SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_TRANSACTIONS, deleteTransaction } from "./TransactionQueries";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { AppPagination } from "@app/_components/_core";

// TransactionsList: fetches all, shows table, supports delete + navigation to form
export default function TransactionsList() {
  const navigate = useNavigate();

   // added search + pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchElement = useRef();

  // fetch transactions from backend
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions",searchTerm, currentPage],
    queryFn: ({ signal }) =>{
      const gql = GET_TRANSACTIONS(searchTerm, currentPage);
    return gqlQuery({ signal, path: "/graphql", inData: { gql } });},
    keepPreviousData:true,
  });

  // delete mutation
  const { mutate: removeTransaction, isPending: isDeleting } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  const handleDelete = (id) => {
    // small confirm before deleting
    if (!window.confirm("Delete this transaction?")) return;
    const gql = deleteTransaction(id);
    removeTransaction({ path: "/graphql", inData: { gql } });
  };


  // new: handle search + pagination
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchElement.current.value || "");
    setCurrentPage(1);
  };

  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const rows = data?.rows || [];
  const totalRows = data?.totalRows || 0;
  // console.log(data.rows);
  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Token Transactions</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/askdaysi/transactions/new")}
        >
          Add Transaction
        </Button>
      </Stack>
       {/*  added search bar */}
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3 }}>
        <TextField
          size="small"
          inputRef={searchElement}
          placeholder="Search transactions..."
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
                <SearchOutlined />
              </IconButton>
            ),
          }}
        />
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">{error?.info?.message || error?.message || "Failed to load transactions."}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Module</strong></TableCell>
                <TableCell><strong>Unique ID</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Tokens</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No transactions found.</TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.moduleCode}</TableCell>
                    <TableCell style={{ fontFamily: "monospace", fontSize: 13 }}>{r.uniqueId || "—"}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell>{r.tokens}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => navigate(`/askdaysi/transactions/${r.id}`)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(r.id)} disabled={isDeleting}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* pagination added */}
      {data?.totalRows > 0 && (
        <AppPagination
          current_page={currentPage}
          current_rowsPerPage={PER_PAGE}
          totalRows={data.totalRows}
          onHandleChangePage={handlePage}
        />
      )}
    </Box>
  );
}
