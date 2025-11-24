import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import {
  Box,
  Button,
  TextField,
  Paper,
  Container,
  Stack,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
import {
  GET_TEACHER,
  createTeacher,
  updateTeacher,
} from "./TeacherQueries";

export default function TeacherForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [values, setValues] = useState({

    firstName: "",
    lastName: "",
    email: "",
    qualification: "",
  });

  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

  // Fetch in edit mode
  const { isLoading } = useQuery({
    queryKey: ["teacher", params.id],
    enabled: !!params.id,
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_TEACHER(params.id) },
      }),
    onSuccess: (res) => {
      const t = res?.allTeachersById;
      if (t) {
        setValues({
          firstName: t.firstName || "",
          lastName: t.lastName || "",
          email: t.email || "",
          qualification: t.qualification || "",
        });
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"]);
      navigate("/askdaysi/TeacherModule");
    },
    onError: (err) =>
      setFormError({
        isError: true,
        message:
          err?.info?.message || err.message || "Something went wrong",
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const gql = params.id
      ? updateTeacher({ ...values, id: params.id })
      : createTeacher(values);

    mutate({ path: "/graphql", inData: { gql } });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          {params.id ? "Edit Teacher" : "Add Teacher"}
        </Typography>

        {formError.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError.message}
          </Alert>
        )}

        {isLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="First Name"
                value={values.firstName}
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
                fullWidth
              />

              <TextField
                label="Last Name"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
                fullWidth
              />

              <TextField
                label="Email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                fullWidth
              />

              <TextField
                label="Qualification"
                value={values.qualification}
                onChange={(e) =>
                  setValues({ ...values, qualification: e.target.value })
                }
                fullWidth
              />

              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button type="submit" variant="contained" disabled={isPending}>
                  {params.id ? "Update" : "Save"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/askdaysi/TeacherModule")}
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
