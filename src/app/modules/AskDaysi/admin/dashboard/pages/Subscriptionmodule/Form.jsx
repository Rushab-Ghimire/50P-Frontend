import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";

import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http";
import { GET_SUBSCRIPTION, createSubscription, updateSubscription } from "./SubscriptionQueries";

const schema = Yup.object({
  subscriptionType: Yup.string().required("Type is required"),
  price: Yup.number().typeError("Must be a number").required("Price is required"),
  paymentStatus: Yup.string().required("Status is required"),
});

export default function SubscriptionForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    subscriptionType: "",
    price: "",
    paymentStatus: "",
    isActive: true,
  });

  const [error, setError] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["subscription", id],
    enabled: !!id,
    queryFn: ({ signal }) => gqlQuery({ signal, path: "/graphql", inData: { gql: GET_SUBSCRIPTION(id) } }),
    onSuccess: (res) => {
      if (res?.subscriptionById) setValues(res.subscriptionById);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptions"]);
      navigate("/SubscriptionModule");
    },
    onError: (err) => setError(err.message || "Something went wrong"),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await schema.validate(values, { abortEarly: false });
      const gql = id ? updateSubscription({ ...values, subscriptionId: id }) : createSubscription(values);
      mutate({ path: "/graphql", inData: { gql } });
    } catch (err) {
      setError(err.errors ? err.errors.join(", ") : err.message);
    }
  };

  return (
    <Paper sx={{ p: 4, m: 4 }}>
      <Typography variant="h5">{id ? "Update" : "Add"} Subscription</Typography>
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      {isLoading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select name="subscriptionType" value={values.subscriptionType} onChange={handleChange}>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="paymentStatus" value={values.paymentStatus} onChange={handleChange}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Checkbox name="isActive" checked={values.isActive} onChange={handleChange} />}
              label="Active"
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button type="submit" variant="contained" disabled={isPending}>
                {id ? "Update" : "Save"}
              </Button>
              <Button variant="outlined" color="error" onClick={() => navigate("/askdaysi/SubscriptionModule")}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      )}
    </Paper>
  );
}
