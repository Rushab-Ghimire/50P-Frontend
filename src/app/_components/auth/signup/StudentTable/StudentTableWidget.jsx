import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const StudentTableWidget = () => {
  // Static student data (simulating API data)
  const [students, setStudents] = useState([
    { id: 1, firstName: "Prajwal", lastName: "Limbu", email: "prajwal@example.com" },
    { id: 2, firstName: "Rushab", lastName: "Ghimire", email: "rushab@example.com" },
    { id: 3, firstName: "Nimesh", lastName: "shrestha", email: "nimesh@example.com" },
    { id: 4, firstName: "Prasna", lastName: "Basnet", email: "prasna@example.com" },
  ]);

  // State for Add Student dialog
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add student to table (frontend only)
  const handleAddStudent = () => {
    const nextId = students.length + 1;
    setStudents([...students, { id: nextId, ...newStudent }]);
    setOpen(false);
    setNewStudent({ firstName: "", lastName: "", email: "" });
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        p: 3,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "green", mr: 1 }}>
          <SchoolIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Student List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          + Add Student
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.100" }}>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell sx={{ color: "primary.main" }}>
                  {student.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Student Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            fullWidth
            value={newStudent.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            fullWidth
            value={newStudent.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={newStudent.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export {StudentTableWidget};
