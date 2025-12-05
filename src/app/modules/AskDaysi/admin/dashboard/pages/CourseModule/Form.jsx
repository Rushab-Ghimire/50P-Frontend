import React, { useState } from "react";
import {
  Box, Button, Stack, Typography, Alert, CircularProgress,
  TextField, Paper, Container
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
import { GET_COURSE, createCourse, updateCourse } from "./CourseQueries";

// VALIDATION
const validationSchema = Yup.object({
  courseName: Yup.string().required("Course Name is required"),
  level: Yup.string().required("Level is required"),
  teacherId: Yup.string().required("Teacher is required"),
  duration: Yup.number().required("Duration (days) is required"),
});

export default function CourseForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [values, setValues] = useState({
    courseName: "",
    level: "",
    teacherId: "",
    duration: "",
  });

  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

  // LOAD COURSE FOR EDIT
  const { isLoading } = useQuery({
    queryKey: ["course", params.id],
    enabled: !!params.id,
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_COURSE(params.id) },
      }),
    onSuccess: (res) => {
      const c = res?.allrourseById;
      if (c) {
        setValues({
          courseName: c.courseName || "",
          level: c.level || "",
          duration: c.duration || "",
          teacherId: c.teacher?.uniqueId || "",
        });
      }
    },
  });

  // CREATE / UPDATE
  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
      navigate("/askdaysi/CourseModule");
    },
    onError: (err) =>
      setFormError({
        isError: true,
        message: err?.info?.message || err.message || "Something went wrong.",
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError({ isError: false, message: "" });

    try {
      await validationSchema.validate(values, { abortEarly: false });

      const gql = params.id
        ? updateCourse({ ...values, id: params.id })
        : createCourse(values);

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
        <Typography variant="h5" sx={{ mb: 3 }}>
          {params.id ? "Edit Course" : "Add Course"}
        </Typography>

        {formError.isError && (
          <Alert severity="error">{formError.message}</Alert>
        )}

        {isLoading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Course Name"
                name="courseName"
                value={values.courseName}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Level"
                name="level"
                value={values.level}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Duration (Days)"
                name="duration"
                value={values.duration}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Teacher ID"
                name="teacherId"
                value={values.teacherId}
                onChange={handleChange}
                fullWidth
              />

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button type="submit" variant="contained" disabled={isPending}>
                  {params.id ? "Update" : "Save"}
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => navigate("/askdaysi/CourseModule")}
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
