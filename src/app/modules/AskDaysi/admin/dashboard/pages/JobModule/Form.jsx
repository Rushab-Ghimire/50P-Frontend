// JobForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";

import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";

// ------------------- VALIDATION -------------------
const validationSchema = Yup.object({
  job_title: Yup.string().required("Job title is required"),
  description: Yup.string().required("Description is required"),
  salary: Yup.string().required("Salary is required"),
});

// ------------------- MAIN COMPONENT -------------------
export default function JobForm() {
  const navigate = useNavigate();
  const params = useParams(); // params.id when editing

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

  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

  // ------------------- FETCH SINGLE JOB (EDIT MODE) -------------------
  const { isLoading } = useQuery({
    queryKey: ["job", params.id],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: {
          gql: `
            # TODO: Add GraphQL Query to get single job by ID
            # Example:
            # query {
            #   job(id: ${params.id}) {
            #     id
            #     job_title
            #     description
            #     ...
            #   }
            # }
          `,
        },
      }),
    enabled: !!params.id,
    onSuccess: (res) => {
      const job = res?.job;
      if (job) {
        setValues({
          job_title: job.job_title || "",
          description: job.description || "",
          qualification: job.qualification || "",
          location: job.location || "",
          salary: job.salary || "",
          employee_type: job.employee_type || "Full-Time",
          category: job.category || "",
          experience: job.experience || "",
        });
      }
    },
  });

  // ------------------- CREATE / UPDATE MUTATION -------------------
  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      navigate("/jobs");
    },
    onError: (err) =>
      setFormError({
        isError: true,
        message:
          err?.info?.message || err?.message || "Something went wrong.",
      }),
  });

  // ------------------- SUBMIT HANDLER -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError({ isError: false, message: "" });

    try {
      await validationSchema.validate(values, { abortEarly: false });

      const gql = params.id
        ? `
            # TODO: Add Update Job Mutation
          `
        : `
            # TODO: Add Create Job Mutation
          `;

      mutate({ path: "/graphql", inData: { gql } });
    } catch (error) {
      setFormError({
        isError: true,
        message: (error.errors || []).join(", "),
      });
    }
  };

  // ------------------- HANDLE INPUT CHANGE -------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form when creating new
  useEffect(() => {
    if (!params.id) {
      setValues({
        job_title: "",
        description: "",
        qualification: "",
        location: "",
        salary: "",
        employee_type: "Full-Time",
        category: "",
        experience: "",
      });
    }
  }, [params.id]);

  // ------------------- UI -------------------
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
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
              <TextField
                label="Job Title"
                name="job_title"
                value={values.job_title}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                value={values.description}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Qualification"
                name="qualification"
                value={values.qualification}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Location"
                name="location"
                value={values.location}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Salary"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Employee Type</InputLabel>
                <Select
                  name="employee_type"
                  label="Employee Type"
                  value={values.employee_type}
                  onChange={handleChange}
                >
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Experience"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                fullWidth
              />

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button type="submit" variant="contained" disabled={isPending}>
                  {params.id ? "Update" : "Save"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => navigate("/jobs")}
                >
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
