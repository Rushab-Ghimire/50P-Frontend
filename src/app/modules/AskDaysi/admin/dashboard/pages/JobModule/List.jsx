// import React, { useRef, useState } from "react";
// import {
//   Box, Button, IconButton, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, Typography, CircularProgress,
//   Alert, Stack, Tooltip, TextField
// } from "@mui/material";
// import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useQuery, useMutation } from "react-query";
// import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
// import { GET_JOBS, deleteJob } from "./JobQueries";
// import { PER_PAGE } from "@app/_utilities/constants/paths";
// import { AppPagination } from "@app/_components/_core";

// export default function JobsList() {
//   const navigate = useNavigate();
//   const searchInput = useRef();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // FETCH JOBS
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["jobs", searchTerm, currentPage],
//     queryFn: ({ signal }) =>
//       gqlQuery({
//         signal,
//         path: "/graphql",
//         inData: { gql: GET_JOBS(searchTerm, currentPage) }
//       }),
    
//     keepPreviousData: true,
//   });

//   const rows = data?.rows || [];
//   const totalRows = data?.totalRows || 0;
  
//   // DELETE JOB
//   const { mutate: removeJob, isPending: isDeleting } = useMutation({
//     mutationFn: gqlMutate,
//     onSuccess: () => queryClient.invalidateQueries(["jobs"]),
//   });

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this job?")) return;
//     removeJob({
//       path: "/graphql",
//       inData: { gql: deleteJob(id) },
//     });
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
//         <Typography variant="h5" fontWeight={600}>Jobs Listings</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => navigate("/askdaysi/JobModule/new")}
//         >
//           Add Job
//         </Button>
//       </Stack>

//       {/* SEARCH */}
//       <Box
//         component="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setSearchTerm(searchInput.current.value);
//           setCurrentPage(1);
//         }}
//         sx={{ mb: 3 }}
//       >
//         <TextField
//           size="small"
//           inputRef={searchInput}
//           placeholder="Search jobs..."
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
//         <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
//           <CircularProgress />
//         </Box>
//       ) : isError ? (
//         <Alert severity="error">{error?.info?.message || error?.message}</Alert>
//       ) : (
//         <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell><strong>ID</strong></TableCell>
//                 <TableCell><strong>Title</strong></TableCell>
//                 <TableCell><strong>Category</strong></TableCell>
//                 <TableCell><strong>Location</strong></TableCell>
//                 <TableCell><strong>Salary</strong></TableCell>
//                 <TableCell align="center"><strong>Actions</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">No jobs found.</TableCell>
//                 </TableRow>
//               ) : (
//                 rows.map((r) => (
//                   <TableRow key={r.jobId} hover>
//                     <TableCell>{r.jobId}</TableCell>
//                     <TableCell>{r.jobTitle}</TableCell>
//                     <TableCell>{r.category}</TableCell>
//                     <TableCell>{r.location}</TableCell>
//                     <TableCell>{r.salary}</TableCell>

//                     <TableCell align="center">
//                       <Tooltip title="Edit">
//                         <IconButton
//                           color="primary"
//                           onClick={() => navigate(`/askdaysi/JobModule/${r.jobId}`)}
//                         >
//                           <Edit />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           disabled={isDeleting}
//                           onClick={() => handleDelete(r.jobId)}
//                         >
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

//       {/* PAGINATION */}
//       {totalRows > 0 && (
//         <AppPagination
//           current_page={currentPage}
//           current_rowsPerPage={PER_PAGE}
//           totalRows={totalRows}
//           onHandleChangePage={(p) => setCurrentPage(p)}
//         />
//       )}
//     </Box>
//   );
// }
import React, { useRef, useState } from "react";
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography, CircularProgress,
  Alert, Stack, Tooltip, TextField
} from "@mui/material";
import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
import { GET_JOBS, deleteJob } from "./JobQueries";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { AppPagination } from "@app/_components/_core";

export default function JobsList() {
  const navigate = useNavigate();
  const searchInput = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // FETCH JOB LIST
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", searchTerm, currentPage],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_JOBS(searchTerm, currentPage) },
      }),
    keepPreviousData: true,
  });

  const rows = data?.rows || [];
  const totalRows = data?.totalRows || 0;

  // DELETE JOB
  const { mutate: removeJob, isPending: isDeleting } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => queryClient.invalidateQueries(["jobs"]),
  });

  const handleDelete = (id) => {
    if (!window.confirm("Delete this job?")) return;

    removeJob({
      path: "/graphql",
      inData: { gql: deleteJob(id) },
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Jobs Listings
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/askdaysi/JobModule/new")}
        >
          Add Job
        </Button>
      </Stack>

      {/* SEARCH */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchTerm(searchInput.current.value);
          setCurrentPage(1);
        }}
        sx={{ mb: 3 }}
      >
        <TextField
          size="small"
          inputRef={searchInput}
          placeholder="Search jobs..."
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
                <SearchOutlined />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* TABLE */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">Something went wrong</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Salary</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No jobs found.</TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.jobId} hover>
                    <TableCell>{r.jobId}</TableCell>
                    <TableCell>{r.jobTitle}</TableCell>
                    <TableCell>{r.category}</TableCell>
                    <TableCell>{r.location}</TableCell>
                    <TableCell>{r.salary}</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`/askdaysi/JobModule/${r.jobId}`)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          disabled={isDeleting}
                          onClick={() => handleDelete(r.jobId)}
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

      {/* PAGINATION */}
      {totalRows > 0 && (
        <AppPagination
          current_page={currentPage}
          current_rowsPerPage={PER_PAGE}
          totalRows={totalRows}
          onHandleChangePage={(p) => setCurrentPage(p)}
        />
      )}
    </Box>
  );
}
