import React from "react";
import { Grid } from "@mui/material";
import HealthCheckComponent from "../../components/HealthCheck";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import { BFormTitle } from "@app/_styles/business";

const data = [
  {
    id: 1,
    title: "Payment Gateway",
    responseCode: 200,
    description: "This service is being used for all the payments",
    icon: <LocalAtmOutlinedIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Email Service",
    responseCode: 200,
    description: "This service is being used for all the emails",
    icon: <MailOutlinedIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "SMS Service",
    responseCode: 200,
    description: "This service is being used for all the SMS",
    icon: <MessageOutlinedIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "API Service",
    responseCode: 200,
    description: "This service is being used for all the integrations",
    icon: <SettingsSuggestOutlinedIcon fontSize="large" />,
  },
  {
    id: 5,
    title: "Open AI Service",
    responseCode: 200,
    description: "This service is being used for all the responses",
    icon: <MemoryOutlinedIcon fontSize="large" />,
  },
];

const HealthChecker = () => {
  return (
    <>
      <BFormTitle variant={"h2"} fontWeight={"500"}>
        Health Checker
      </BFormTitle>
      <Grid container spacing={4}>
        {data.map((data, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <HealthCheckComponent
              title={data.title}
              status={data.status}
              responseCode={data.responseCode}
              description={data.description}
              icon={data.icon}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HealthChecker;
