

// list.jsx
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

const dummyCourses = [
  { id: 1, course_name: "Web Development", teacher: "Raj", duration: "3 months", level: "Beginner" },
  { id: 2, course_name: "Graphic Design", teacher: "Mina", duration: "2 months", level: "Intermediate" },
  { id: 3, course_name: "Data Science", teacher: "Rohan", duration: "40 hours", level: "Advanced" },
];

export function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = dummyCourses.filter((c) =>
    c.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>Course List</Typography>

      <Box component="form" sx={{ mb: 3 }} onSubmit={(e) => e.preventDefault()}>
        <TextField
          size="small"
          placeholder="Search courses..."
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
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Teacher</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Level</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">No courses found.</TableCell></TableRow>
            ) : (
              filtered.map((course) => (
                <TableRow key={course.id} hover>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.course_name}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.level}</TableCell>
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
        Add Course
      </Button>
    </Box>
  );
}
export default CourseList;
