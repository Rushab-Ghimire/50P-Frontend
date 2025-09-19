import { JumboCard } from "@jumbo/components";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";

const HealthCheckComponent = ({ title, responseCode, description, icon }) => {
  return (
    <>
      <JumboCard contentWrapper>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Stack>{icon}</Stack>
          <Stack>
            <Button
              size="small"
              variant="contained"
              color={responseCode === 200 ? "success" : "error"}
              sx={{
                textTransform: "none",
                borderRadius: "30px",
                pointerEvents: "none",
              }}
            >
              {responseCode === 200 ? "Available" : "Not-Available"}
            </Button>
          </Stack>
        </Box>
        <Typography variant="h2" fontWeight={"500"} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="h4">Response Code: {responseCode}</Typography>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {description}
        </Typography>
      </JumboCard>
    </>
  );
};

export default HealthCheckComponent;
