// // UserForm.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Stack,
//   Typography,
//   Alert,
//   CircularProgress,
//   TextField,
//   Paper,
//   Container,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useQuery, useMutation } from "react-query";
// import * as Yup from "yup";
// import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
// import { GET_USER, createUser, updateUser } from "./UserQueries";

// const validationSchema = Yup.object({
//   firstName: Yup.string().required("First name required"),
//   lastName: Yup.string().required("Last name required"),
//   courseId: Yup.number().required("Course ID required"),
//   subscriptionId: Yup.number().required("Subscription ID required"),
// });

// export default function UserForm() {
//   const navigate = useNavigate();
//   const params = useParams();

//   const [values, setValues] = useState({
//     firstName: "",
//     lastName: "",
//     courseId: "",
//     subscriptionId: "",
//     profilePic: "",
//   });

//   const [formError, setFormError] = useState("");

//   const { isLoading } = useQuery({
//     queryKey: ["user", params.id],
//     queryFn: ({ signal }) =>
//       gqlQuery({ signal, path: "/graphql", inData: { gql: GET_USER() } }),
//     enabled: !!params.id,
//     onSuccess: (res) => {
//       const user = res?.allUsers?.rows?.find(
//         (r) => String(r.id) === String(params.id)
//       );
//       if (user) {
//         setValues({
//           firstName: user.firstName,
//           lastName: user.lastName,
//           courseId: user.courseId,
//           subscriptionId: user.subscriptionId,
//           profilePic: user.profilePic || "",
//         });
//       }
//     },
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: gqlMutate,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//       navigate("/askdaysi/users");
//     },
//     onError: (err) => setFormError(err?.info?.message || err.message),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await validationSchema.validate(values, { abortEarly: false });

//       const gql = params.id
//         ? updateUser({ ...values, id: params.id })
//         : createUser(values);

//       mutate({ path: "/graphql", inData: { gql } });
//     } catch (err) {
//       setFormError(err.errors ? err.errors.join(", ") : err.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues((v) => ({ ...v, [name]: value }));
//   };

//   useEffect(() => {
//     if (!params.id) {
//       setValues({
//         firstName: "",
//         lastName: "",
//         courseId: "",
//         subscriptionId: "",
//         profilePic: "",
//       });
//     }
//   }, [params.id]);

//   return (
//     <Container maxWidth="sm" sx={{ py: 5 }}>
//       <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
//         <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
//           {params.id ? "Edit User" : "Add User"}
//         </Typography>

//         {formError && <Alert severity="error">{formError}</Alert>}

//         {isLoading ? (
//           <Stack alignItems="center" sx={{ py: 5 }}>
//             <CircularProgress />
//           </Stack>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <Stack spacing={3}>
//               <TextField
//                 label="First Name"
//                 name="firstName"
//                 value={values.firstName}
//                 onChange={handleChange}
//                 fullWidth
//               />

//               <TextField
//                 label="Last Name"
//                 name="lastName"
//                 value={values.lastName}
//                 onChange={handleChange}
//                 fullWidth
//               />

//               <TextField
//                 label="Course ID"
//                 name="courseId"
//                 type="number"
//                 value={values.courseId}
//                 onChange={handleChange}
//                 fullWidth
//               />

//               <TextField
//                 label="Subscription ID"
//                 name="subscriptionId"
//                 type="number"
//                 value={values.subscriptionId}
//                 onChange={handleChange}
//                 fullWidth
//               />

//               <TextField
//                 label="Profile Picture (URL)"
//                 name="profilePic"
//                 value={values.profilePic}
//                 onChange={handleChange}
//                 fullWidth
//               />

//               <Box display="flex" justifyContent="flex-end" gap={2}>
//                 <Button type="submit" variant="contained">
//                   {params.id ? "Update" : "Save"}
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => navigate("/askdaysi/users")}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Stack>
//           </form>
//         )}
//       </Paper>
//     </Container>
//   );
// }
// UserForm.jsx (UI Improved Only)
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_USER, createUser, updateUser } from "./UserQueries";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  courseId: Yup.number().required("Course ID required"),
  subscriptionId: Yup.number().required("Subscription ID required"),
});

export default function UserForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    courseId: "",
    subscriptionId: "",
    profilePic: "",
  });

  const [formError, setFormError] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["user", params.id],
    queryFn: ({ signal }) =>
      gqlQuery({ signal, path: "/graphql", inData: { gql: GET_USER() } }),
    enabled: !!params.id,
    onSuccess: (res) => {
      const user = res?.allUsers?.rows?.find(
        (r) => String(r.id) === String(params.id)
      );
      if (user) {
        setValues({
          firstName: user.firstName,
          lastName: user.lastName,
          courseId: user.courseId,
          subscriptionId: user.subscriptionId,
          profilePic: user.profilePic || "",
        });
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/askdaysi/users");
    },
    onError: (err) => setFormError(err?.info?.message || err.message),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const gql = params.id
        ? updateUser({ ...values, id: params.id })
        : createUser(values);

      mutate({ path: "/graphql", inData: { gql } });
    } catch (err) {
      setFormError(err.errors ? err.errors.join(", ") : err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  useEffect(() => {
    if (!params.id) {
      setValues({
        firstName: "",
        lastName: "",
        courseId: "",
        subscriptionId: "",
        profilePic: "",
      });
    }
  }, [params.id]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 22px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          {params.id ? "Edit User" : "Add User"}
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        {isLoading ? (
          <Stack alignItems="center" sx={{ py: 5 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Course ID", name: "courseId", type: "number" },
                { label: "Subscription ID", name: "subscriptionId", type: "number" },
                { label: "Profile Picture (URL)", name: "profilePic" },
              ].map((f) => (
                <TextField
                  key={f.name}
                  label={f.label}
                  name={f.name}
                  type={f.type || "text"}
                  value={values[f.name]}
                  onChange={handleChange}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              ))}

              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ px: 3, py: 1, borderRadius: 2 }}
                >
                  {params.id ? "Update" : "Save"}
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  sx={{ px: 3, py: 1, borderRadius: 2 }}
                  onClick={() => navigate("/askdaysi/users")}
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
