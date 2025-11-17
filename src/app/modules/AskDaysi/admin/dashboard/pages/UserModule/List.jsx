// // UserList.jsx
// import React, { useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
//   Alert,
//   Stack,
//   Tooltip,
//   TextField,
// } from "@mui/material";
// import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useQuery, useMutation } from "react-query";
// import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
// import { GET_USERS, deleteUser } from "./UserQueries";
// import { PER_PAGE } from "@app/_utilities/constants/paths";
// import { AppPagination } from "@app/_components/_core";

// export default function UserList() {
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const searchRef = useRef();

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["users", searchTerm, currentPage],
//     queryFn: ({ signal }) => {
//       const gql = GET_USERS(searchTerm, currentPage);
//       return gqlQuery({ signal, path: "/graphql", inData: { gql } });
//     },
//     keepPreviousData: true,
//   });

//   const { mutate: removeUser, isPending } = useMutation({
//     mutationFn: gqlMutate,
//     onSuccess: () => queryClient.invalidateQueries(["users"]),
//   });

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     const gql = deleteUser(id);
//     removeUser({ path: "/graphql", inData: { gql } });
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     setSearchTerm(searchRef.current.value || "");
//     setCurrentPage(1);
//   };

//   const handlePage = (page) => setCurrentPage(page);

//   const rows = data?.rows || [];
//   const totalRows = data?.totalRows || 0;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
//         <Typography variant="h5" fontWeight={600}>Users</Typography>

//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => navigate("/askdaysi/users/new")}
//         >
//           Add User
//         </Button>
//       </Stack>

//       {/* Search */}
//       <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3 }}>
//         <TextField
//           size="small"
//           inputRef={searchRef}
//           placeholder="Search users..."
//           InputProps={{
//             endAdornment: (
//               <IconButton type="submit">
//                 <SearchOutlined />
//               </IconButton>
//             ),
//           }}
//         />
//       </Box>

//       {isLoading ? (
//         <Box textAlign="center" sx={{ py: 6 }}>
//           <CircularProgress />
//         </Box>
//       ) : isError ? (
//         <Alert severity="error">{error?.message || "Failed to load users"}</Alert>
//       ) : (
//         <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "#f5f5f5" }}>
//                 <TableCell><strong>ID</strong></TableCell>
//                 <TableCell><strong>First Name</strong></TableCell>
//                 <TableCell><strong>Last Name</strong></TableCell>
//                 <TableCell><strong>Course</strong></TableCell>
//                 <TableCell><strong>Subscription</strong></TableCell>
//                 <TableCell><strong>Profile Pic</strong></TableCell>
//                 <TableCell><strong>Unique ID</strong></TableCell>
//                 <TableCell align="center"><strong>Actions</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">No users found.</TableCell>
//                 </TableRow>
//               ) : (
//                 rows.map((r) => (
//                   <TableRow key={r.id} hover>
//                     <TableCell>{r.id}</TableCell>
//                     <TableCell>{r.firstName}</TableCell>
//                     <TableCell>{r.lastName}</TableCell>
//                     <TableCell>{r.courseId}</TableCell>
//                     <TableCell>{r.subscriptionId}</TableCell>
//                     <TableCell>{r.profilePic || "—"}</TableCell>
//                     <TableCell style={{ fontFamily: "monospace" }}>
//                       {r.uniqueId}
//                     </TableCell>

//                     <TableCell align="center">
//                       <Tooltip title="Edit">
//                         <IconButton
//                           onClick={() => navigate(`/askdaysi/users/${r.id}`)}
//                         >
//                           <Edit />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton color="error" onClick={() => handleDelete(r.id)}>
//                           <Delete />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {totalRows > 0 && (
//         <AppPagination
//           current_page={currentPage}
//           current_rowsPerPage={PER_PAGE}
//           totalRows={totalRows}
//           onHandleChangePage={handlePage}
//         />
//       )}
//     </Box>
//   );
// }

// UserList.jsx (UI Improved Only)
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
import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_USERS, deleteUser } from "./UserQueries";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { AppPagination } from "@app/_components/_core";

export default function UserList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchRef = useRef();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", searchTerm, currentPage],
    queryFn: ({ signal }) => {
      const gql = GET_USERS(searchTerm, currentPage);
      return gqlQuery({ signal, path: "/graphql", inData: { gql } });
    },
    keepPreviousData: true,
  });

  const { mutate: removeUser } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;
    const gql = deleteUser(id);
    removeUser({ path: "/graphql", inData: { gql } });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchRef.current.value || "");
    setCurrentPage(1);
  };

  const handlePage = (page) => setCurrentPage(page);

  const rows = data?.rows || [];
  const totalRows = data?.totalRows || 0;

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h2" fontWeight={300}>
          User Module
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1,
            fontWeight: 400,
          }}
          onClick={() => navigate("/askdaysi/UserModule/new")}
        >
          Add User
        </Button>
      </Stack>

      {/* Search Box */}
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          p: 1.1,
          mb: 5,
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <TextField
          size="small"
          inputRef={searchRef}
          placeholder="Search users..."
          fullWidth
          sx={{ mr: 1 }}
        />
        <IconButton type="submit">
          <SearchOutlined />
        </IconButton>
      </Paper>

      {/* Loader / Error / Table */}
      {isLoading ? (
        <Box textAlign="center" sx={{ py: 6 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">
          {error?.message || "Failed to load users"}
        </Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#fafafa" }}>
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Course",
                  "Subscription",
                  "Profile Pic",
                  "Unique ID",
                  "Actions",
                ].map((h, index) => (
                  <TableCell key={index} sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.id} hover sx={{ '&:hover': { background: "#f9f9f9" } }}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.firstName}</TableCell>
                    <TableCell>{r.lastName}</TableCell>
                    <TableCell>{r.courseId}</TableCell>
                    <TableCell>{r.subscriptionId}</TableCell>
                    <TableCell>{r.profilePic || "—"}</TableCell>
                    <TableCell sx={{ fontFamily: "monospace" }}>
                      {r.uniqueId}
                    </TableCell>

                    {/* Action Buttons */}
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => navigate(`/askdaysi/users/${r.id}`)}
                          sx={{ mr: 1 }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(r.id)}
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
      )}

      {/* Pagination */}
      {totalRows > 0 && (
        <Box sx={{ mt: 3 }}>
          <AppPagination
            current_page={currentPage}
            current_rowsPerPage={PER_PAGE}
            totalRows={totalRows}
            onHandleChangePage={handlePage}
          />
        </Box>
      )}
    </Box>
  );
}
