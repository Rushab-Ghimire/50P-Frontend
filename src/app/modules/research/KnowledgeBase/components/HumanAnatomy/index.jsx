import React from "react";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import humanBody from "/assets/images/askdaysi/human-anatomy/human.svg";
import Indicators from "./indicators";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircleIcon from "@mui/icons-material/Circle";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

const indicatorsData = [
  {
    id: 1,
    icon: <FavoriteIcon sx={{ color: "#f9415b" }} />,
    name: "Heart",
    color: "#f9415b",
    normalText: "Normal",
    criticalText: "Critical",
    value: 70,
  },
  {
    id: 2,
    icon: <CircleIcon sx={{ color: "#f5d042" }} />,
    name: "Liver",
    color: "#f5d042",
    borderLineText: "Borderline",
    value: 60,
  },
  {
    id: 3,
    icon: <CircleIcon sx={{ color: "#58ab83" }} />,
    name: "Kidneys",
    color: "#58ab83",
    normalText: "Normal",
    value: 40,
  },
];

const HumanAnatomy = () => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: Colors.white_1, padding: 2 }}>
      <Box
        sx={{
          backgroundColor: Colors.white,
          mt: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${Colors.gray_3}`,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            },
          }}
        >
          <Stack>
            <Typography variant="h2" fontWeight={"600"} margin={"0"}>
              <TextSnippetOutlinedIcon
                sx={{ position: "relative", top: "3px" }}
              />{" "}
              EHR / Lab Results
            </Typography>
          </Stack>
          <Stack>
            <Button variant="contained">Upload</Button>
          </Stack>
        </Box>
        <Box sx={{ borderBottom: `1px solid ${Colors.gray_3}`, mt: 4, pb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6} textAlign="center">
              <img
                src={humanBody}
                alt="Human Body"
                style={{ width: "45%", margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              {indicatorsData.map((data, index) => (
                <Indicators
                  key={index}
                  icon={data.icon}
                  name={data.name}
                  color={data.color}
                  normalText={data.normalText}
                  criticalText={data.criticalText}
                  borderLineText={data.borderLineText}
                  value={data.value}
                />
              ))}
              <Indicators color={"#03c04a"} percentValue={40} />
              <Box sx={{ mr: 2, ml: 2, mt: 4 }}>
                <Typography variant="h2" fontWeight={500}>
                  Analysis Engine: CURA
                </Typography>
                <Typography variant="h4">
                  Some results are inconclusive. Further tests are needed to
                  accurately assess the condition of the body.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h2" fontWeight={500} mb={0}>
            Overall Health
          </Typography>
          <Typography variant="h3" fontWeight={500} fontSize={36}>
            UNCERTAIN
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HumanAnatomy;
