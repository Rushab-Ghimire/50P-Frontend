import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function AddTransactionDialog({ open, handleClose, handleSave }) {
  const [form, setForm] = useState({
    module_code: "",
    status: "new",
    tokens: "",
  });

  const handleSubmit = () => {
    if (!form.module_code || !form.status || !form.tokens) {
      alert("Please fill all fields");
      return;
    }
    handleSave(form);
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: "20px", width: 480 } }}>
      <DialogTitle sx={{ textAlign: "center" }}>Add Transaction</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Module Code"
              fullWidth
              value={form.module_code}
              onChange={(e) => setForm({ ...form, module_code: e.target.value })}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tokens"
              type="number"
              fullWidth
              value={form.tokens}
              onChange={(e) => setForm({ ...form, tokens: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: "18px",
            px: 3,
            background: "linear-gradient(90deg, #1976d2)",
            "&:hover": { background: "linear-gradient(90deg, #1565c0)" },
          }}
        >
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export {AddTransactionDialog};