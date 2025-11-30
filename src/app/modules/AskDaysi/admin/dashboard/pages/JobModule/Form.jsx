// JobForm.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Button, Stack, Typography, Alert, CircularProgress,
  TextField, Paper, Container, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
import { GET_JOB, createJob, updateJob } from "./JobQueries";

// Validation
const validationSchema = Yup.object({
  jobTitle: Yup.string().required("Job title is required"),
  description: Yup.string().required("Description is required"),
  qualification: Yup.string().required("Qualification is required"),
  location: Yup.string().required("Location is required"),
  salary: Yup.string().required("Salary is required"),
  employmentType: Yup.string().required("Employment type is required"),
  category: Yup.string().required("Category is required"),
  experience: Yup.string().required("Experience is required"),
});

export default function JobForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [values, setValues] = useState({
    jobTitle: "",
    description: "",
    qualification: "",
    location: "",
    salary: "",
    employmentType: "",
    category: "",
    experience: "",
  });

  const [formError, setFormError] = useState({ isError: false, message: "" });

  // FETCH job when editing
  const { isLoading } = useQuery({
    queryKey: ["job", params.id],
    queryFn: ({ signal }) =>
      gqlQuery({ signal, path: "/graphql", inData: { gql: GET_JOB(params.id) } }),
    enabled: !!params.id,
    onSuccess: (res) => {
      const rows = res?.allJobs?.rows || [];
      const job = rows.find((r) => String(r.jobId) === String(params.id));
      if (job) setValues(job);
    },
  });

  // CREATE / UPDATE
  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      navigate("/JobModule");
    },
    onError: (err) =>
      setFormError({
        isError: true,
        message: err?.info?.message || "Something went wrong.",
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError({ isError: false, message: "" });

    try {
      await validationSchema.validate(values, { abortEarly: false });

      const gql = params.id
        ? updateJob({ ...values, jobId: params.id })
        : createJob(values);

      mutate({ path: "/graphql", inData: { gql } });
    } catch (err) {
      setFormError({ isError: true, message: err.errors.join(", ") });
    }
  };

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          {params.id ? "Edit Job" : "Add Job"}
        </Typography>

        {formError.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError.message}
          </Alert>
        )}

        {isLoading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>

              <TextField label="Job Title" name="jobTitle" value={values.jobTitle} onChange={handleChange} fullWidth />

              <TextField multiline rows={3} label="Description" name="description" value={values.description} onChange={handleChange} fullWidth />

              <TextField label="Qualification" name="qualification" value={values.qualification} onChange={handleChange} fullWidth />

              <TextField label="Location" name="location" value={values.location} onChange={handleChange} fullWidth />

              <TextField label="Salary" name="salary" value={values.salary} onChange={handleChange} fullWidth />

              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select name="employmentType" label="Employment Type" value={values.employmentType} onChange={handleChange}>
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </Select>
              </FormControl>

              <TextField label="Category" name="category" value={values.category} onChange={handleChange} fullWidth />

              <TextField label="Experience" name="experience" value={values.experience} onChange={handleChange} fullWidth />

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button type="submit" variant="contained" disabled={isPending}>
                  {params.id ? "Update" : "Save"}
                </Button>

                <Button color="error" variant="outlined" onClick={() => navigate("/askdaysi/JobModule")}>
                  Cancel
                </Button>
              </Box>

            </Stack>
          </form>
        )}
      </Paper>
    </Container>
  );
}