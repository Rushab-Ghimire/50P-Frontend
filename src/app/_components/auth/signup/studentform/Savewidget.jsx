import React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";

const SaveWidget = () => {
  return (
    <Box
      sx={{
        maxWidth: 350,
        mx: "auto",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "white",
      }}
    >
      {/* Title */}
      <Stack alignItems="center" spacing={1.5} mb={3}>
        <Avatar sx={{ bgcolor: "blue", width: 45, height: 45 }}>
          <SaveIcon fontSize="medium" />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          User Info
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter details and click Save
        </Typography>
      </Stack>

      {/* Form */}
      <JumboForm
        onSubmit={(data) => {
          console.log("Saved Data:", data);
        }}
      >
        <Stack spacing={2}>
          {/* First Name */}
          <JumboInput fieldName="firstName" label="First Name" />

          {/* Last Name */}
          <JumboInput fieldName="lastName" label="Last Name" />

          {/* Email */}
          <JumboOutlinedInput
            fieldName="email"
            label="Email"
            type="email"
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
