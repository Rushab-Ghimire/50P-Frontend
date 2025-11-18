// form.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  TextField,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function CourseForm() {
  const [values, setValues] = useState({
    course_name: "",
    teacher: "",
    duration: "",
    level: "Beginner",
  });

  const [formError, setFormError] = useState({ isError: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.course_name) {
      return setFormError({ isError: true, message: "Course name is required." });
    }
    alert("Course saved (dummy logic)!");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Add / Edit Course
        </Typography>

        {formError.isError && <Alert severity="error" sx={{ mb: 2 }}>{formError.message}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField label="Course Name" name="course_name" value={values.course_name} onChange={handleChange} fullWidth />

            <TextField label="Teacher" name="teacher" value={values.teacher} onChange={handleChange} fullWidth />

            <TextField label="Duration" name="duration" value={values.duration} onChange={handleChange} fullWidth />

            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select name="level" value={values.level} label="Level" onChange={handleChange}>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 1 }}>
              <Button type="submit" variant="contained">Save</Button>
              <Button variant="outlined" color="error">Cancel</Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}


