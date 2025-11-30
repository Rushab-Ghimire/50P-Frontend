
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
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_COURSES, deleteCourse } from "./CourseQueries";

export function CourseList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["courses", searchTerm],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_COURSES(searchTerm, 1) },
      }),
    keepPreviousData: true,
  });

  const { mutate: deleteCourseMutate } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => queryClient.invalidateQueries(["courses"]),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourseMutate({
        path: "/graphql",
        inData: { gql: deleteCourse(id) },
      });
    }
  };

  const rows = data?.allCourses?.rows || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Course List
      </Typography>

      <Box sx={{ mb: 3 }}>
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
              <TableCell><strong>Course</strong></TableCell>
              <TableCell><strong>Teacher</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Level</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
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
              rows.map((course) => (
                <TableRow key={course.id} hover>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.teacher?.fullName}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.level}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/askdaysi/CourseModule/${course.id}`)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(course.id)}
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

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ mt: 3 }}
        onClick={() => navigate("/askdaysi/CourseModule/new")}
      >
        Add Course
      </Button>
    </Box>
  );
}

export default CourseList;
