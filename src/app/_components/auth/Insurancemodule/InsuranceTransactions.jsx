
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TextField,
//   Typography,
//   Paper,
//   Stack,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TableContainer,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { styled } from "@mui/material/styles";

// // ------------------------- Styles -------------------------
// const StyledCard = styled(Paper)(() => ({
//   borderRadius: "20px",
//   padding: "30px",
//   background: "#fff",
//   width: "100%",
//   // boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
//   // transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   // "&:hover": {
//   //   transform: "scale(1.01)",
//   //   boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
//   // },
// }));

// const HeaderBar = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "25px",
// }));

// const StyledTable = styled(Table)(() => ({
//   width: "100%",
//   borderCollapse: "collapse",
//   "& thead th": {
//     backgroundColor: "#f5f7fa",
//     color: "#1b2559",
//     fontWeight: 400,
//     fontSize: "15px",
//     padding: "14px 16px",
//     borderBottom: "2px solid #e0e0e0",
//   },
//   "& tbody tr": {
//     backgroundColor: "#fff",
//     transition: "background 0.3s ease",
//   },
//   "& tbody tr:hover": {
//     backgroundColor: "#f9f9f9",
//   },
//   "& tbody td": {
//     padding: "12px 16px",
//     borderBottom: "1px solid #f0f0f0",
//     fontSize: "14px",
//   },
// }));

// const ActionButton = styled(Button)(({ colorType }) => ({
//   textTransform: "none",
//   borderRadius: "100px",
//   fontWeight: 500,
//   padding: "5px 12px",
//   fontSize: "14px",
//   ...(colorType === "edit"
//     ? {
//         borderColor: "#21dbf3ff",
//         color: "#5419d2ff",
//         backgroundColor: "#e3f2fd",
//         "&:hover": { backgroundColor: "#bbdefb61" },
//       }
//     : {
//         borderColor: "#c750efff",
//         color: "#d32f2f",
//         backgroundColor: "#ffebebff",
//         "&:hover": { backgroundColor: "#ffcdcdff" },
//       }),
// }));

// // ------------------------- Component -------------------------
// export default function InsuranceTransactions({ title }) {
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   //  Dummy data (replace with GraphQL API later)
//   const [transactions, setTransactions] = useState([
//     {
//       id: 1,
//       user_id: 101,
//       module_code: "INS01",
//       unique_id: "a1b2c3d4-e5f6-7890-gh12-i345j678k901",
//       status: "new",
//       tokens: 50,
//       created_date: "2025-10-30T10:32",
//       modified_date: "2025-10-31T09:10",
//     },
//     {
//       id: 2,
//       user_id: 102,
//       module_code: "INS02",
//       unique_id: "z9y8x7w6-v5u4-t3s2-r1q0-p987o654n321",
//       status: "completed",
//       tokens: 80,
//       created_date: "2025-10-29T14:05",
//       modified_date: "2025-10-30T12:30",
//     },
//   ]);

//   const [form, setForm] = useState({
//     user_id: "",
//     module_code: "",
//     unique_id: "",
//     status: "",
//     tokens: "",
//     created_date: "",
//     modified_date: "",
//   });

//   // ------------------------- Handlers -------------------------
//   const handleSave = () => {
//     if (
//       !form.user_id ||
//       !form.module_code ||
//       !form.unique_id ||
//       !form.status ||
//       !form.tokens
//     ) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     if (editMode) {
//       setTransactions((prev) =>
//         prev.map((tx) => (tx.id === selectedId ? { ...form, id: selectedId } : tx))
//       );
//     } else {
//       const newTx = {
//         ...form,
//         id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
//       };
//       setTransactions([...transactions, newTx]);
//     }

//     setOpen(false);
//     setEditMode(false);
//     resetForm();
//   };

//   const handleEdit = (tx) => {
//     setForm(tx);
//     setSelectedId(tx.id);
//     setEditMode(true);
//     setOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this transaction?")) {
//       setTransactions((prev) => prev.filter((tx) => tx.id !== id));
//     }
//   };

//   const resetForm = () =>
//     setForm({
//       user_id: "",
//       module_code: "",
//       unique_id: "",
//       status: "",
//       tokens: "",
//       created_date: "",
//       modified_date: "",
//     });

//   return (
//     <StyledCard>
//       {/* -------------------- Header -------------------- */}
//       <HeaderBar>
//         <Typography variant="h3" sx={{ fontWeight: 400, color: "#1b2559" }}>
//           {"Insurance Transactions"}
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => {
//             setOpen(true);
//             setEditMode(false);
//             resetForm();
//           }}
//           sx={{
//             textTransform: "none",
//             borderRadius: "10px",
//             px: 2,
//             py: 1.2,
//             fontWeight: 400,
//             fontSize: "15px",
//             background: "linear-gradient(90deg, #1976d2)",
//             boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
//             "&:hover": {
//               background: "linear-gradient(90deg, #1e88e5)",
//             },
//           }}
//         >
//           Add Transaction
//         </Button>
//       </HeaderBar>

//       {/* -------------------- Table -------------------- */}
//       <TableContainer component={Paper} elevation={0} >
//         <StyledTable>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>User ID</TableCell>
//               <TableCell>Module Code</TableCell>
//               <TableCell>Unique ID</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Tokens</TableCell>
//               <TableCell>Created Date</TableCell>
//               <TableCell>Modified Date</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {transactions.map((tx) => (
//               <TableRow key={tx.id}>
//                 <TableCell>{tx.id}</TableCell>
//                 <TableCell>{tx.user_id}</TableCell>
//                 <TableCell>{tx.module_code}</TableCell>
//                 <TableCell sx={{ fontFamily: "monospace", fontSize: "10px" }}>
//                   {tx.unique_id}
//                 </TableCell>
//                 <TableCell>
//                   <Typography
//                     sx={{
//                       fontWeight: 400,
//                       color:
//                         tx.status === "completed"
//                           ? "green"
//                           : tx.status === "new"
//                           ? "#ff1900ff"
//                           : "#1976d2",
//                     }}
//                   >
//                     {tx.status}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>{tx.tokens}</TableCell>
//                 <TableCell>
//                   {new Date(tx.created_date).toLocaleString()}
//                 </TableCell>
//                 <TableCell>
//                   {new Date(tx.modified_date).toLocaleString()}
//                 </TableCell>
//                 <TableCell align="center">
//                   <Stack direction="row" spacing={1} justifyContent="center">
//                     <ActionButton
//                       variant="outlined"
//                       colorType="edit"
//                       startIcon={<EditOutlinedIcon />}
//                       onClick={() => handleEdit(tx)}
//                     >
//                       Edit
//                     </ActionButton>
//                     <ActionButton
//                       variant="outlined"
//                       colorType="delete"
//                       startIcon={<DeleteOutlineOutlinedIcon />}
//                       onClick={() => handleDelete(tx.id)}
//                     >
//                       Delete
//                     </ActionButton>
//                   </Stack>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </StyledTable>
//       </TableContainer>

//       {/* -------------------- Dialog -------------------- */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{ sx: { borderRadius: "20px", width: 480, p: 1 } }}
//       >
//         <DialogTitle sx={{ fontWeight: 400, textAlign: "center" }}>
//           {editMode ? "Edit Transaction" : "Add New Transaction"}
//         </DialogTitle>

//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={6}>
//               <TextField
//                 label="User ID"
//                 fullWidth
//                 value={form.user_id}
//                 onChange={(e) => setForm({ ...form, user_id: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Module Code"
//                 fullWidth
//                 value={form.module_code}
//                 onChange={(e) =>
//                   setForm({ ...form, module_code: e.target.value })
//                 }
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Unique ID"
//                 fullWidth
//                 value={form.unique_id}
//                 onChange={(e) => setForm({ ...form, unique_id: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   label="Status"
//                   value={form.status}
//                   onChange={(e) => setForm({ ...form, status: e.target.value })}
//                 >
//                   <MenuItem value="new">New</MenuItem>
//                   <MenuItem value="completed">Completed</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Tokens"
//                 type="number"
//                 fullWidth
//                 value={form.tokens}
//                 onChange={(e) => setForm({ ...form, tokens: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label=""
//                 type="datetime-local"
//                 fullWidth
//                 value={form.created_date}
//                 onChange={(e) =>
//                   setForm({ ...form, created_date: e.target.value })
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label=""
//                 type="datetime-local"
//                 fullWidth
//                 value={form.modified_date}
//                 onChange={(e) =>
//                   setForm({ ...form, modified_date: e.target.value })
//                 }
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
//           <Button
//             variant="contained"
//             onClick={handleSave}
//             sx={{
//               borderRadius: "18px",
//               px: 3,
//               background: "linear-gradient(90deg, #1976d2)",
//               fontWeight: 400,
//               "&:hover": {
//                 background: "linear-gradient(90deg, #1565c0)",
//               },
//             }}
//           >
//             {editMode ? "Update" : "Save"}
//           </Button>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </StyledCard>
//   );
// }

// export { InsuranceTransactions };

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  Stack,
  TableContainer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";
import AddTransactionDialog from "./AddTransactionDialog";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

const StyledCard = styled(Paper)(() => ({
  borderRadius: "20px",
  padding: "30px",
  background: "#fff",
  width: "100%",
}));

const HeaderBar = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
}));

const StyledTable = styled(Table)(() => ({
  width: "100%",
  "& thead th": {
    backgroundColor: "#f5f7fa",
    color: "#1b2559",
    fontWeight: 500,
    fontSize: "15px",
    padding: "14px 16px",
  },
}));

const ActionButton = styled(Button)(({ colorType }) => ({
  textTransform: "none",
  borderRadius: "100px",
  fontWeight: 500,
  padding: "5px 12px",
  fontSize: "14px",
  ...(colorType === "edit"
    ? {
        borderColor: "#21dbf3ff",
        color: "#5419d2ff",
        backgroundColor: "#e3f2fd",
        "&:hover": { backgroundColor: "#bbdefb61" },
      }
    : {
        borderColor: "#c750efff",
        color: "#d32f2f",
        backgroundColor: "#ffebebff",
        "&:hover": { backgroundColor: "#ffcdcdff" },
      }),
}));

export default function InsuranceTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const GRAPHQL_URL = "/graphql/"; 

  // ---------------- FETCH ALL ----------------
  const fetchTransactions = async () => {
    const query = `
      query {
        allTokensTransactions {
          totalRows
          rows {
            id
            moduleCode
            uniqueId
            status
            tokens
          }
        }
      }
    `;
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      credentials: "include",
    });
    const { data } = await res.json();
    setTransactions(data?.allTokensTransactions?.rows || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ---------------- CREATE ----------------
  const handleAdd = async (formData) => {
    const mutation = `
      mutation {
        addTransaction(
          moduleCode: "${formData.module_code}",
          status: "${formData.status}",
          tokens: ${formData.tokens}
        ) {
          transaction { id }
        }
      }
    `;
    await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
      credentials: "include",
    });
    setOpenAdd(false);
    fetchTransactions();
  };

  // ---------------- UPDATE ----------------
  const handleEdit = async (formData) => {
    const mutation = `
      mutation {
        updateTransaction(
          id: ${formData.id},
          moduleCode: "${formData.module_code}",
          status: "${formData.status}",
          tokens: ${formData.tokens}
        ) {
          transaction { id }
        }
      }
    `;
    await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
      credentials: "include",
    });
    setOpenEdit(false);
    fetchTransactions();
  };

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    const mutation = `
      mutation {
        deleteTransaction(id: ${selected.id}) { ok }
      }
    `;
    await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
      credentials: "include",
    });
    setOpenDelete(false);
    fetchTransactions();
  };

  return (
    <StyledCard>
      <HeaderBar>
        <Typography variant="h3" sx={{ fontWeight: 500, color: "#1b2559" }}>
          Insurance Transactions
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            px: 2,
            py: 1.2,
            fontWeight: 500,
            fontSize: "15px",
            background: "linear-gradient(90deg, #1976d2)",
            "&:hover": { background: "linear-gradient(90deg, #1e88e5)" },
          }}
        >
          Add Transaction
        </Button>
      </HeaderBar>

      {/* ---------------- TABLE ---------------- */}
      <TableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Module Code</TableCell>
              <TableCell>Unique ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tokens</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{tx.moduleCode}</TableCell>
                <TableCell>{tx.uniqueId}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        tx.status === "completed"
                          ? "green"
                          : tx.status === "new"
                          ? "red"
                          : "#1976d2",
                    }}
                  >
                    {tx.status}
                  </Typography>
                </TableCell>
                <TableCell>{tx.tokens}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <ActionButton
                      variant="outlined"
                      colorType="edit"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => {
                        setSelected(tx);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </ActionButton>
                    <ActionButton
                      variant="outlined"
                      colorType="delete"
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      onClick={() => {
                        setSelected(tx);
                        setOpenDelete(true);
                      }}
                    >
                      Delete
                    </ActionButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>

      {/* ---------------- MODALS ---------------- */}
      <AddTransactionDialog
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        handleSave={handleAdd}
      />

      <EditTransactionDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleSave={handleEdit}
        editData={selected}
      />

      <DeleteTransactionDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleConfirm={handleDelete}
      />
    </StyledCard>
  );
}

export {InsuranceTransactions};
