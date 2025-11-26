// SubscriptionForm.jsx
import React, { useEffect, useState ,useRef} from "react";
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
  IconButton,
} from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_SUBSCRIPTION, CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "./SubscriptionQueries";

// validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  price: Yup.number().typeError("Must be a number").required("Price are required"),
  status: Yup.string().required("Status is required"),
 
});

// Form: 
export default function SubscriptionForm() {
  const navigate = useNavigate();
  const params = useParams(); // params.id when editing
  const [values, setValues] = useState({ name: "",  price: "", status: "" });
  const [formError, setFormError] = useState({ isError: false, message: "" });


  // fetch all 
  const { isLoading } = useQuery({
    queryKey: ["SubscriptionModule", params.id],
    queryFn: ({ signal }) =>
      gqlQuery({ signal, path: "/graphql", inData: { gql: GET_TRANSACTION(params.id) } }),
    enabled: !!params.id,
    onSuccess: (res) => {
      const rows = res?.allSubscriptions?.rows || [];
      
      const item = rows.find((r) => String(r.id) === String(params.id));
      if (item) {
        setValues({
          name: item.name || "",
          price: item.price ?? "",
          status: item.status || "",
          
        });
      }
    },
  });

  // create / update mutation
  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["SubscriptionModule"]);
      navigate("/askdaysi/SubscriptionModule");
    },
    onError: (err) => setFormError({ isError: true, message: err?.info?.message || err?.message || "Something went wrong." }),
  });

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError({ isError: false, message: "" });
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const gql = params.id
        ? updateSubscription({ ...values, id: params.id })
        : createSubscription(values);

      mutate({ path: "/graphql", inData: { gql } });
    } catch (err) {
      setFormError({ isError: true, message: (err.errors || []).join(", ") || err.message });
    }
  };

  // controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };

  // Keep UI tidy: if user visits /askdaysi/transactions/new then clear any loaded values
  useEffect(() => {
    if (!params.id) setValues({ name: "", price: "", status: "" });
  }, [params.id]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          {params.id ? "Edit Subscription" : "update Subscription"}
        </Typography>
        
           
        {formError.isError && <Alert severity="error" sx={{ mb: 2 }}>{formError.message}</Alert>}

        {isLoading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                name="Name"
                value={values.name}
                onChange={handleChange}
                fullWidth
              />



              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={values.status} onChange={handleChange} label="Status">
                  <MenuItem value="new">New</MenuItem>
                  
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Price"
                name="Price"
                type="number"
                value={values.tokens}
                onChange={handleChange}
                fullWidth
              />

              <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 1 }}>
                <Button type="submit" variant="contained" disabled={isPending}>
                  {params.id ? "Update" : "Save"}
                </Button>
                <Button variant="outlined" color="error" onClick={() => navigate("/askdaysi/SubsciptionModule")}>
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
