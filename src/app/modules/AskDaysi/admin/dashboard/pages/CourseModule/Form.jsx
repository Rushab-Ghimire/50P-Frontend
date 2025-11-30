
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
  MenuItem
} from "@mui/material";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_COURSE, createCourse, updateCourse } from "./CourseQueries";

// Validation
const validationSchema = Yup.object({
  courseName: Yup.string().required("Course name is required"),
  level: Yup.string().required("Level is required"),
  duration: Yup.number().typeError("Duration must be a number").required("Duration is required"),
  teacherId: Yup.string().required("Teacher is required"),
});

export default function CourseForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [values, setValues] = useState({
    courseName: "",
    level: "",
    duration: "",
    teacherId: "",
  });

  const [formError, setFormError] = useState({ isError: false, message: "" });

  // ---------------------------- FETCH COURSE BY ID ------------------------
  const { isLoading } = useQuery({
    queryKey: ["courses", params.id],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_COURSE(params.id) }
      }),
    enabled: !!params.id,
    onSuccess: (res) => {
      const item = res?.allCourseById;
      if (item) {
        setValues({
          courseName: item.courseName || "",
          level: item.level || "",
          duration: item.duration || "",
          teacherId: item.teacher?.id || "",
        });
      }
    },
  });

  // ---------------------------- CREATE / UPDATE ------------------------
  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      navigate("/askdaysi/CourseModule");
    },
    onError: (err) =>
      setFormError({
        isError: true,
        message: err?.info?.message || err?.message || "Something went wrong."
      }),
  });

  // ---------------------------- SUBMIT HANDLER ------------------------
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
      setFormError({
        isError: true,
        message: err.errors?.join(", ") || err.message
      });
    }
  };

  // ---------------------------- INPUT CHANGE ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };

  useEffect(() => {
    if (!params.id) {
      setValues({ courseName: "", level: "", duration: "", teacherId: "" });
    }
  }, [params.id]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          {params.id ? "Edit Course" : "Add Course"}
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
                label="Course Name"
                name="courseName"
                value={values.courseName}
                onChange={handleChange}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={values.level}
                  label="Level"
                  onChange={handleChange}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Duration"
                name="duration"
                type="number"
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
                  variant="outlined"
                  color="error"
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

