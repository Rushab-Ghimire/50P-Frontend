import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  TextField,
  Paper,
  Container,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { dummySubscriptions } from "./SubscriptionQueries";

export default function SubscriptionForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    subscription_id: "",
    user_id: "",
    course_id: "",
    subscription_type: "",
    is_active: false,
    price: "",
    payment_status: "",
    transaction_id: "",
  });

  const [error, setError] = useState("");

  // Load existing data for edit
  useEffect(() => {
    if (id) {
      const subscription = dummySubscriptions.find(
        (s) => String(s.subscription_id) === String(id)
      );
      if (subscription) {
        setValues(subscription);
      } else {
        setError("Subscription not found (dummy)");
      }
    }
  }, [id]);

  // Handle form value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleToggle = (e) => {
    setValues((v) => ({ ...v, is_active: e.target.checked }));
  };

  // Save/Update
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !values.user_id ||
      !values.course_id ||
      !values.subscription_type ||
      !values.price
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (id) {
      // Update dummy record
      const index = dummySubscriptions.findIndex(
        (s) => String(s.subscription_id) === String(id)
      );
      if (index !== -1) {
        dummySubscriptions[index] = values;
        alert("Subscription updated (dummy)");
      }
    } else {
      // Add new dummy record
      const newId =
        dummySubscriptions.length > 0
          ? dummySubscriptions[dummySubscriptions.length - 1].subscription_id + 1
          : 1;

      dummySubscriptions.push({
        ...values,
        subscription_id: newId,
      });

      alert("Subscription added (dummy)");
    }

    navigate("/askdaysi/SubscriptionModule");
  };

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
          {id ? "Edit Subscription" : "Add Subscription"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="User ID"
              name="user_id"
              type="number"
              value={values.user_id}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Course ID"
              name="course_id"
              type="number"
              value={values.course_id}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Subscription Type"
              name="subscription_type"
              value={values.subscription_type}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
              <MenuItem value="lifetime">Lifetime</MenuItem>
            </TextField>

            <FormControlLabel
              control={
                <Switch
                  checked={values.is_active}
                  onChange={handleToggle}
                  name="is_active"
                />
              }
              label="Active"
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Payment Status"
              name="payment_status"
              value={values.payment_status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </TextField>

            <TextField
              label="Transaction ID"
              name="transaction_id"
              value={values.transaction_id}
              onChange={handleChange}
              fullWidth
            />

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ px: 3, borderRadius: 2 }}
              >
                {id ? "Update" : "Save"}
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ px: 3, borderRadius: 2 }}
                onClick={() => navigate("/subscriptions")}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
