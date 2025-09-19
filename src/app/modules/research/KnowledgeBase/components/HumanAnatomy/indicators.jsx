import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

export default function Indicators({
  icon,
  name,
  color,
  normalText,
  criticalText,
  borderLineText,
  value,
  percentValue,
}) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color,
      ...theme.applyStyles("dark", {
        backgroundColor: color,
      }),
    },
  }));
  return (
    <Box sx={{ mr: 2, ml: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Stack>{icon}</Stack>
        <Stack>
          <Typography variant="h2" fontWeight={600} margin={0}>
            {name}
          </Typography>
        </Stack>
      </Box>
      {value && (
        <Box>
          <BorderLinearProgress variant="determinate" value={value} />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        <Stack>
          <Typography variant="h3" fontWeight={500}>
            {normalText}
            {borderLineText}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h3" fontWeight={500}>
            {criticalText}
          </Typography>
        </Stack>
      </Box>
      {/* Progress bar with bacground with percentage  */}
      {percentValue && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: Colors.gray_5,
            borderRadius: 2,
            p: 1,
            // mt: 1,
          }}
        >
          <Stack sx={{ width: "100%", mr: 2 }}>
            <BorderLinearProgress variant="determinate" value={percentValue} />
          </Stack>
          <Stack>
            <Typography variant="h3" m={0} color={Colors.black}>
              {percentValue}%
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
