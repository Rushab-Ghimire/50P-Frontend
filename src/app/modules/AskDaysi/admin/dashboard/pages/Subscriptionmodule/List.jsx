// import React, { useState } from "react";
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
//   TextField,
//   Stack,
//   Tooltip,
// } from "@mui/material";
// import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { dummySubscriptions } from "./SubscriptionQueries";
// import { AppPagination } from "@app/_components/_core";
// export default function SubscriptionList() {
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter dummy data
//   const rows = dummySubscriptions.filter((s) =>
//     String(s.user_id).includes(searchTerm) ||
//     String(s.subscription_id).includes(searchTerm)
//   );

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete subscription?")) return;

//     const index = dummySubscriptions.findIndex((s) => s.subscription_id === id);
//     if (index !== -1) dummySubscriptions.splice(index, 1);

//     alert("Deleted (Dummy Only)");
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       {/* Header */}
//       <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//         <Typography variant="h4" fontWeight={600}>
//           Subscriptions
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           sx={{ borderRadius: 2, px: 3 }}
//           onClick={() => navigate("/askdaysi/SubscriptionModule/new")}
//         >
//           Add Subscription
//         </Button>
//       </Stack>

//       {/* Search */}
//       <Paper sx={{ p: 2, mb: 4, borderRadius: 3, display: "flex", gap: 2 }}>
//         <SearchOutlined sx={{ opacity: 0.6, mt: 0.5 }} />
//         <TextField
//           placeholder="Search by Subscription ID or User ID..."
//           variant="standard"
//           fullWidth
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Paper>

//       {/* Table */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           borderRadius: 4,
//           boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: "#f5f7fa" }}>
//               {[
//                 "ID",
//                 "User",
//                 "Course",
//                 "Type",
//                 "Active",
//                 "Price",
//                 "Payment",
//                 "Transaction",
//                 "Actions",
//               ].map((head) => (
//                 <TableCell key={head} sx={{ fontWeight: 700 }}>
//                   {head}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
//                   No subscriptions found.
//                 </TableCell>
//               </TableRow>
//             )}

//             {rows.map((s) => (
//               <TableRow key={s.subscription_id} hover>
//                 <TableCell>{s.subscription_id}</TableCell>
//                 <TableCell>{s.user_id}</TableCell>
//                 <TableCell>{s.course_id}</TableCell>
//                 <TableCell>{s.subscription_type}</TableCell>
//                 <TableCell>{s.is_active ? "Yes" : "No"}</TableCell>
//                 <TableCell>${s.price}</TableCell>
//                 <TableCell>{s.payment_status}</TableCell>
//                 <TableCell sx={{ fontFamily: "monospace" }}>
//                   {s.transaction_id}
//                 </TableCell>

//                 <TableCell>
//                   <Tooltip title="Edit">
//                     <IconButton onClick={() => navigate(`/askdaysi/SubscriptionModule/${s.subscription_id}`)}>
//                       <Edit />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     {/* <IconButton color="error" onClick={() => handleDelete(s.subscription_id)}> */}
//                        <IconButton color="error" onClick={() => handleDelete(s.subscription_id)}>
//                       <Delete />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//         {/* pagination added */}
//       {data?.totalRows > 0 && (
//         <AppPagination
//           current_page={currentPage}
//           current_rowsPerPage={PER_PAGE}
//           totalRows={data.totalRows}
//           onHandleChangePage={handlePage}
//         />
//       )}
//     </Box>
//   );
// }

import React, { useState } from "react";
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
  TextField,
  Stack,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { dummySubscriptions } from "./SubscriptionQueries";
import { AppPagination } from "@app/_components/_core";

export default function SubscriptionList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 10;

  // Dummy total rows 
  const data = {
    totalRows: dummySubscriptions.length,
  };

  const handlePage = (event, page) => {
    setCurrentPage(page);
  };

  // Filter dummy data
  const rows = dummySubscriptions.filter(
    (s) =>
      String(s.user_id).includes(searchTerm) ||
      String(s.subscription_id).includes(searchTerm)
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete subscription?")) return;

    const index = dummySubscriptions.findIndex(
      (s) => s.subscription_id === id
    );
    if (index !== -1) dummySubscriptions.splice(index, 1);

    alert("Deleted (Dummy Only)");
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight={600}>
          Subscriptions
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2, px: 3 }}
          onClick={() => navigate("/askdaysi/SubscriptionModule/new")}
        >
          Add Subscription
        </Button>
      </Stack>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 3, display: "flex", gap: 2 }}>
        <SearchOutlined sx={{ opacity: 0.6, mt: 0.5 }} />
        <TextField
          placeholder="Search by Subscription ID or User ID..."
          variant="standard"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#f5f7fa" }}>
              {[
                "ID",
                "User",
                "Course",
                "Type",
                "Active",
                "Price",
                "Payment",
                "Transaction",
                "Actions",
              ].map((head) => (
                <TableCell key={head} sx={{ fontWeight: 700 }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  No subscriptions found.
                </TableCell>
              </TableRow>
            )}

            {rows.map((s) => (
              <TableRow key={s.subscription_id} hover>
                <TableCell>{s.subscription_id}</TableCell>
                <TableCell>{s.user_id}</TableCell>
                <TableCell>{s.course_id}</TableCell>
                <TableCell>{s.subscription_type}</TableCell>
                <TableCell>{s.is_active ? "Yes" : "No"}</TableCell>
                <TableCell>${s.price}</TableCell>
                <TableCell>{s.payment_status}</TableCell>
                <TableCell sx={{ fontFamily: "monospace" }}>
                  {s.transaction_id}
                </TableCell>

                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/askdaysi/SubscriptionModule/${s.subscription_id}`
                        )
                      }
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(s.subscription_id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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

