
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
  Tooltip,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete, SearchOutlined } from "@mui/icons-material";

const dummyJobs = [
  { id: 1, job_title: "Software Engineer", location: "Dharan", employee_type: "Full-Time", salary: "80000", category: "IT" },
  { id: 2, job_title: "Accountant", location: "Kathmandu", employee_type: "Part-Time", salary: "40000", category: "Finance" },
  { id: 3, job_title: "HR Manager", location: "Biratnagar", employee_type: "Full-Time", salary: "60000", category: "HR" },
];

export function JobList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = dummyJobs.filter((j) =>
    j.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>Job Listings</Typography>

      <Box component="form" sx={{ mb: 3 }} onSubmit={(e) => e.preventDefault()}>
        <TextField
          size="small"
          placeholder="Search jobs..."
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchOutlined />
              </IconButton>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Job Title</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} align="center">No jobs found.</TableCell></TableRow>
            ) : (
              filtered.map((job) => (
                <TableRow key={job.id} hover>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.job_title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.employee_type}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton color="primary"><Edit /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error"><Delete /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" startIcon={<Add />} sx={{ mt: 3 }}>
        Add Job
      </Button>
    </Box>
  );
}
export default JobList;