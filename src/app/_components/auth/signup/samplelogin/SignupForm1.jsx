import LoadingButton from "@mui/lab/LoadingButton";
import { validationSchema } from "../validation";
import { Stack, Box, Typography, Avatar } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React from "react";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";

const SignupForm1 = () => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      {/* TopIcon xa ani  Title */}
      <Stack alignItems="center" spacing={1.5} mb={3}>
        <Avatar sx={{ bgcolor: "green", width: 50, height: 50 }}>
          <PersonAddAltIcon fontSize="large" />
        </Avatar>
        <Typography variant="h1" fontWeight="bold">
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please fill in your details to create an account
        </Typography>
      </Stack>

      {/* Form */}
      <JumboForm
        validationSchema={validationSchema}
        onSubmit={() => { }}//api call
        onChange={() => { }}
      >
        <Stack spacing={3}>
          {/* First Name */}
          <JumboInput fieldName={"firstname"} label={"firstName"} defaultValue="Admin" />

          {/* Last Name */}
          <JumboInput fieldName={"lastName"} label={"last Name"} defaultValue="user" />

          {/* Email */}
          <JumboOutlinedInput
            fieldName={"email"}
            label={"Email"}
            type="email"
            defaultValue="admin@example.cpm"
            sx={{ bgcolor: (theme) => theme.palette.background.paper }}
          />

          {/* Signup Button */}
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Signup
          </LoadingButton>
        </Stack>
      </JumboForm>
    </Box>
  );
};

export { SignupForm1 };
