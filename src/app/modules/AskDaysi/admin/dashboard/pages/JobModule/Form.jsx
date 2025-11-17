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

export default function JobForm() {
  const [values, setValues] = useState({
    job_title: "",
    description: "",
    qualification: "",
    location: "",
    salary: "",
    employee_type: "Full-Time",
    category: "",
    experience: "",
  });

  const [formError, setFormError] = useState({ isError: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.job_title || !values.description) {
      return setFormError({ isError: true, message: "Job title and description are required." });
    }
    alert("Job saved (dummy logic)!");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Add / Edit Job
        </Typography>

        {formError.isError && <Alert severity="error" sx={{ mb: 2 }}>{formError.message}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField label="Job Title" name="job_title" value={values.job_title} onChange={handleChange} fullWidth />

            <TextField label="Description" name="description" multiline rows={3} value={values.description} onChange={handleChange} fullWidth />

            <TextField label="Qualification" name="qualification" value={values.qualification} onChange={handleChange} fullWidth />

            <TextField label="Location" name="location" value={values.location} onChange={handleChange} fullWidth />

            <TextField label="Salary" name="salary" value={values.salary} onChange={handleChange} fullWidth />

            <FormControl fullWidth>
              <InputLabel>Employee Type</InputLabel>
              <Select name="employee_type" value={values.employee_type} label="Employee Type" onChange={handleChange}>
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Category" name="category" value={values.category} onChange={handleChange} fullWidth />

            <TextField label="Experience" name="experience" value={values.experience} onChange={handleChange} fullWidth />

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

