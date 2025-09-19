import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const EmergencyCall = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          [theme.breakpoints.down("md")]: {
            textAlign: "center",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "46px",
            fontWeight: "600",
            color: "#f00",
          }}
        >
          Emergency!
        </Typography>
        <Typography
          variant="h2"
          sx={{ mb: 0, fontSize: "38px", fontWeight: "500", color: "#f00" }}
        >
          Tap the phone icon to call 911
        </Typography>
        <Link to="tel:911" style={{ textDecoration: "none" }}>
          <Box className="phone">
            <LocalPhoneOutlinedIcon
              sx={{
                fontSize: "90px",
                fontWeight: "600",
                backgroundColor: "#f00",
                color: "#fff",
                borderRadius: "50%",
                padding: "10px",
                mt: 3,
              }}
            />
          </Box>
        </Link>

        <Typography
          variant="h5"
          sx={{ color: "#f00", mt: 5, fontSize: "16px", lineHeight: "22px" }}
        >
          AskDaysi is not a substitute for emergency services. In case of an
          emergency, please contact 911 or your local emergency number
          immediately.
        </Typography>
      </Box>
    </>
  );
};

export default EmergencyCall;
