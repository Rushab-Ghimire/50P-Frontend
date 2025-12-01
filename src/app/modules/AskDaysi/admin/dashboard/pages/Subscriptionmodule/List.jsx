import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack,
  Typography,
  Tooltip,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
import { GET_SUBSCRIPTIONS, deleteSubscription } from "./SubscriptionQueries";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { AppPagination } from "@app/_components/_core";

export default function SubscriptionList() {
  const navigate = useNavigate();
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch subscriptions
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["subscriptions", searchTerm, page],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_SUBSCRIPTIONS(searchTerm, page) },
      }),
    keepPreviousData: true,
  });

  // Delete subscription
  const { mutate: removeSubscription, isLoading: isDeleting } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => queryClient.invalidateQueries(["subscriptions"]),
  });

  const handleDelete = (id) => {
    if (!window.confirm("Delete this subscription?")) return;
    removeSubscription({ path: "/graphql", inData: { gql: deleteSubscription(id) } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchRef.current?.value || "");
    setPage(1);
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const rows = data?.rows || [];
  const totalRows = data?.totalRows || 0;

  return (
    <Box sx={{ p: 4 }}>
      {/* Header and Add Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5">Subscriptions Module</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/askdaysi/SubscriptionModule/new")}
        >
          Add Subscription
        </Button>
      </Stack>

      {/* Search */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          inputRef={searchRef}
          placeholder="Search subscriptions..."
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
                <SearchOutlined />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Loading / Error */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">
          {error?.info?.message || error?.message || "Failed to load subscriptions."}
        </Alert>
      ) : (
        <>
          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No subscriptions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows .map((r) => (
                    <TableRow key={r?.subscriptionId}>
                      <TableCell>{r?.subscriptionId}</TableCell>
                      <TableCell>{r?.subscriptionType}</TableCell>
                      <TableCell>{r?.price}</TableCell>
                      <TableCell>{r?.paymentStatus}</TableCell>
                      <TableCell>{r?.isActive ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(`/askdaysi/SubscriptionModule/${r?.subscriptionId}`)
                            }
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(r?.subscriptionId)}
                            disabled={isDeleting}
                          >
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

          {/* Pagination */}
          {totalRows > 0 && (
            <AppPagination
              current_page={page}
              current_rowsPerPage={PER_PAGE}
              totalRows={totalRows}
              onHandleChangePage={handlePageChange}
            />
          )}
        </>
      )}
    </Box>
  );
}
