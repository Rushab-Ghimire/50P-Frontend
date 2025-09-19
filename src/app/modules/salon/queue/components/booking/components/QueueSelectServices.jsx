import React from "react";
import { Button, Container, Grid, IconButton, Stack } from "@mui/material";
import {
  BABtn,
  BAProvider,
  BAProviderImg,
  BAServiceCard,
  BAServiceCardPrice,
  BAServiceCardTime,
  BAServiceCardTitle,
  BAServices,
  BAServicesPrice,
  BAServicesTime,
  BAServicesTitle,
  BAServiceTitle,
  BAServiceWrapper,
  BASWrapper,
  BATitle,
  BATotalText,
  BATotalWrapper,
} from "@app/_styles/BookAppointment";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import SelectedServices from "./QueueSelectedServices";

const serviceList = [
  {
    id: 1,
    title: "Clipper Cut",
    time: "1hr 30mins, 2 Services",
    price: "90",
  },
  {
    id: 2,
    title: "Color & Cut",
    time: "1hr 30mins",
    price: "70",
  },
  {
    id: 3,
    title: "Cut & Go",
    time: "1hr 30mins, 2 Services",
    price: "50",
  },
  {
    id: 4,
    title: "Wash Cut",
    time: "1hr 30mins",
    price: "99",
  },
  {
    id: 5,
    title: "Wash Cut Blow",
    time: "1hr 30mins",
    price: "60",
  },
];

const serviceListTwo = [
  {
    id: 1,
    title: "Color & Cut",
    time: "1hr 30mins",
    price: "90",
  },
  {
    id: 2,
    title: "Clipper & Cut",
    time: "30mins",
    price: "70",
  },
  {
    id: 3,
    title: "Wash Cut & Go",
    time: "1hr 30mins, 2 Services",
    price: "50",
  },
  {
    id: 4,
    title: "Cut & Go",
    time: "1hr 30mins",
    price: "99",
  },
  {
    id: 5,
    title: "Wash Blow Cut",
    time: "1hr 30mins",
    price: "60",
  },
];

const tabStyles = {
  "& .MuiButtonBase-root": {
    textTransform: "capitalize",
    fontSize: "16px",
  },
};

const QueueSelectServices = ({ services, selectService }) => {
  const [value, setValue] = React.useState(`${services[0].id}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <BATitle>Select Services</BATitle>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={tabStyles}
            >
              {services.map((data, index) => (
                <Tab
                  key={data.id}
                  label={data.category_title}
                  value={`${data.id}`}
                />
              ))}
            </TabList>
          </Box>
          {services.map((data, index) => (
            <TabPanel key={data.id} value={`${data.id}`}>
              <BAServiceWrapper>
                <BAServiceTitle>Hair by Senior Colourist</BAServiceTitle>
                {data.services.map((service, s_index) => (
                  <BAServiceCard key={s_index}>
                    <Stack>
                      <BAServiceCardTitle variant="h3">
                        {service.title}
                      </BAServiceCardTitle>
                      <BAServiceCardTime>{service.time}</BAServiceCardTime>
                      <BAServiceCardPrice>
                        {service.price_display}
                      </BAServiceCardPrice>
                    </Stack>
                    <Stack>
                      <IconButton onClick={() => selectService(service)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </BAServiceCard>
                ))}
              </BAServiceWrapper>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default QueueSelectServices;
