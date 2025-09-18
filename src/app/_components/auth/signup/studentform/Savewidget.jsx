import React, { useState } from "react";
import { Box, Stack, Typography, Avatar, Alert } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";

const SaveWidget = () => {
  const [saved, setSaved] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: 350,
        mx: "auto",
        p: 4,
        borderRadius: 8,
        boxShadow: 2,
        bgcolor: "white",
      }}
    >
      {/* Title */}
      <Stack alignItems="center" spacing={1.5} mb={3}>
        <Avatar sx={{ bgcolor: "green", width: 50, height: 50 }}>
          <SaveIcon fontSize="medium" />
        </Avatar>
        <Typography variant="h3" fontWeight="normal">
          Student Form
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter details and click Save
        </Typography>
      </Stack>

      {/* Success Message */}
      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Saved Successfully!
        </Alert>
      )}

      {/* Form */}
      <JumboForm
        onSubmit={(data) => {
          console.log("Saved Data:", data);
          setSaved(true); // show success message
          setTimeout(() => setSaved(false), 3000); // auto-hide after 3s
        }}
      >
        <Stack spacing={2}>
          {/* First Name */}
          <JumboInput fieldName="firstName"
           label="First Name"
           defaultValue="Admin" 
           />

          {/* Last Name */}
          <JumboInput fieldName="lastName"
           label="Last Name" 
           defaultValue="User" 
           />

          {/* Email */}
          <JumboOutlinedInput
            fieldName="email"
            label="Email"
            type="email"
            defaultValue="admin@example.com"
            sx={{ bgcolor: (theme) => theme.palette.background.paper }}
          />

          {/* Save Button */}
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Save
          </LoadingButton>
        </Stack>
      </JumboForm>
    </Box>
  );
};

export { SaveWidget };
