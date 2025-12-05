// // import React, { useRef, useState } from "react";
// // import {
// //   Box, Button, IconButton, Paper, Table, TableBody, TableCell,
// //   TableContainer, TableHead, TableRow, Typography, CircularProgress,
// //   Alert, Stack, Tooltip, TextField
// // } from "@mui/material";

// // import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
// // import { useNavigate } from "react-router-dom";
// // import { useQuery, useMutation } from "react-query";

// // import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
// // import { GET_COURSES, deleteCourse } from "./CourseQueries";
// // import { PER_PAGE } from "@app/_utilities/constants/paths";
// // import { AppPagination } from "@app/_components/_core";

// // export default function CourseList() {
// //   const navigate = useNavigate();
// //   const searchInput = useRef();
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const { data, isLoading, isError, error } = useQuery({
// //     queryKey: ["courses", searchTerm, currentPage],
// //     queryFn: ({ signal }) =>
// //       gqlQuery({
// //         signal,
// //         path: "/graphql",
// //         inData: { gql: GET_COURSES(searchTerm, currentPage) },
// //       }),
// //     keepPreviousData: true,
// //   });

// //   const rows = data?.rows || [];
// //   const totalRows = data?.total_rows || 0;


// //   const { mutate: removeCourse, isPending: isDeleting } = useMutation({
// //     mutationFn: gqlMutate,
// //     onSuccess: () => queryClient.invalidateQueries(["courses"]),
// //   });

// //   const handleDelete = (id) => {
// //     if (!window.confirm("Delete this course?")) return;
// //     removeCourse({
// //       path: "/graphql",
// //       inData: { gql: deleteCourse(id) },
// //     });
// //   };

// //   return (
// //     <Box sx={{ p: 4 }}>
// //       <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
// //         <Typography variant="h5" fontWeight={600}>Courses</Typography>
// //         <Button
// //           variant="contained"
// //           startIcon={<Add />}
// //           onClick={() => navigate("/askdaysi/CourseModule/new")}
// //         >
// //           Add Course
// //         </Button>
// //       </Stack>

// //       {/* SEARCH */}
// //       <Box
// //         component="form"
// //         onSubmit={(e) => {
// //           e.preventDefault();
// //           setSearchTerm(searchInput.current.value);
// //           setCurrentPage(1);
// //         }}
// //         sx={{ mb: 3 }}
// //       >
// //         <TextField
// //           size="small"
// //           inputRef={searchInput}
// //           placeholder="Search courses..."
// //           InputProps={{
// //             endAdornment: (
// //               <IconButton type="submit">
// //                 <SearchOutlined />
// //               </IconButton>
// //             ),
// //           }}
// //         />
// //       </Box>

// //       {isLoading ? (
// //         <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
// //           <CircularProgress />
// //         </Box>
// //       ) : isError ? (
// //         <Alert severity="error">{error?.info?.message || error?.message}</Alert>
// //       ) : (
// //         <TableContainer component={Paper}>
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// //                 <TableCell>ID</TableCell>
// //                 <TableCell>Course Name</TableCell>
// //                 <TableCell>Level</TableCell>
// //                 <TableCell>Duration</TableCell>
// //                 <TableCell>Teacher</TableCell>
// //                 <TableCell align="center">Actions</TableCell>
// //               </TableRow>
// //             </TableHead>

// //             <TableBody>
// //               {rows.length === 0 ? (
// //                 <TableRow>
// //                   <TableCell colSpan={6} align="center">
// //                     No courses found.
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 rows.map((r) => (
// //                   <TableRow key={r.id} hover>
// //                     <TableCell>{r.id}</TableCell>
// //                     <TableCell>{r.courseName}</TableCell>
// //                     <TableCell>{r.level}</TableCell>
// //                     <TableCell>{r.duration}</TableCell>
// //                     <TableCell>{r.teacher?.fullName || "N/A"}</TableCell>

// //                     <TableCell align="center">
// //                       <Tooltip title="Edit">
// //                         <IconButton
// //                           color="primary"
// //                           onClick={() =>
// //                             navigate(`/askdaysi/CourseModule/${r.id}`)
// //                           }
// //                         >
// //                           <Edit />
// //                         </IconButton>
// //                       </Tooltip>

// //                       <Tooltip title="Delete">
// //                         <IconButton
// //                           color="error"
// //                           disabled={isDeleting}
// //                           onClick={() => handleDelete(r.id)}
// //                         >
// //                           <Delete />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}

// //       {totalRows > 0 && (
// //         <AppPagination
// //           current_page={currentPage}
// //           current_rowsPerPage={PER_PAGE}
// //           totalRows={totalRows}
// //           onHandleChangePage={(p) => setCurrentPage(p)}
// //         />
// //       )}
// //     </Box>
// //   );
// // }
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
// import { GET_COURSES, deleteCourse } from "./CourseQueries";
// import { PER_PAGE } from "@app/_utilities/constants/paths";
// import { AppPagination } from "@app/_components/_core";

// export default function CourseList() {
//   const navigate = useNavigate();
//   const searchInput = useRef();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["Course", searchTerm, currentPage],
//     queryFn: ({ signal }) =>
//       gqlQuery({
//         signal,
//         path: "/graphql",
//         inData: { gql: GET_COURSES(searchTerm, currentPage) },
//       }),
//     keepPreviousData: true,
//   });

//   // FIXED CORRECT MAPPING
//   const rows = data?.rows || [];
//   const totalRows = data?.totalRows || 0;

//   const { mutate: removeCourse, isPending: isDeleting } = useMutation({
//     mutationFn: gqlMutate,
//     onSuccess: () => queryClient.invalidateQueries(["Course"]),
//   });

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this course?")) return;
//     removeCourse({
//       path: "/graphql",
//       inData: { gql: deleteCourse(id) },
//     });
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
//         <Typography variant="h5" fontWeight={600}>Courses</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => navigate("/askdaysi/CourseModule/new")}
//         >
//           Add Course
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
//           placeholder="Search courses..."
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
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Course Name</TableCell>
//                 <TableCell>Level</TableCell>
//                 <TableCell>Duration</TableCell>
//                 <TableCell>Teacher</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No courses found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 rows.map((r) => (
//                   <TableRow key={r.id} hover>
//                     <TableCell>{r.id}</TableCell>

//                     {/* FIXED FIELDS */}
//                     <TableCell>{r.courseName}</TableCell>
//                     <TableCell>{r.level}</TableCell>
//                     <TableCell>{r.duration}</TableCell>
//                     <TableCell>{r.teacher?.firstName || "N/A"}</TableCell>

//                     <TableCell align="center">
//                       <Tooltip title="Edit">
//                         <IconButton
//                           color="primary"
//                           onClick={() =>
//                             navigate(`/askdaysi/CourseModule/${r.id}`)
//                           }
//                         >
//                           <Edit />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           disabled={isDeleting}
//                           onClick={() => handleDelete(r.id)}
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
import { GET_COURSES, deleteCourse } from "./CourseQueries";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { AppPagination } from "@app/_components/_core";

export default function CourseList() {
  const navigate = useNavigate();
  const searchInput = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Course", searchTerm, currentPage],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_COURSES(searchTerm, currentPage) },
      }),
    keepPreviousData: true,
  });

  const rows = data?.rows || [];
  const totalRows = data?.totalRows || 0;
  

  const { mutate: removeCourse, isPending: isDeleting } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => queryClient.invalidateQueries(["Course"]),
  });

  const handleDelete = (id) => {
    if (!window.confirm("Delete this course?")) return;
    removeCourse({
      path: "/graphql",
      inData: { gql: deleteCourse(id) },
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Courses</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/askdaysi/CourseModule/new")}
        >
          Add Course
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
          placeholder="Search courses..."
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
        <Alert severity="error">{error?.info?.message || error?.message}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No courses found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.courseName}</TableCell>
                    <TableCell>{c.level}</TableCell>
                    <TableCell>{c.duration}</TableCell>
                    <TableCell>{c.teacher?.firstName || "N/A"}</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(`/askdaysi/CourseModule/${c.id}`)
                          }
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          disabled={isDeleting}
                          onClick={() => handleDelete(c.id)}
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

