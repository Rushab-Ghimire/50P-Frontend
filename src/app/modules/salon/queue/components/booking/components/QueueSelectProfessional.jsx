import React, { useState } from "react";
import { BATitle } from "@app/_styles/BookAppointment";
import { Div } from "@jumbo/shared";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ProGroup from "/assets/images/avatar/group.png";
import { Colors } from "@app/_themes/TileFlex";

import { EqualHeight, EqualHeightElement } from "react-equal-height";

const toggleStyle = {
  "& .Mui-selected": {
    border: "1px solid #6dcff6",
    borderRadius: "12px",
  },
};
const QueueSelectProfessional = ({ resources, setBookingDetail }) => {
  const [pro, setPro] = React.useState();

  const handleChange = (event, newPro) => {
    setPro(newPro);
  };

  const ButtonStyles = {
    textAlign: "center",
    width: "100%",
    border: "1px solid transparent",
  };

  const avatarStyles = {};
  return (
    <>
      <BATitle sx={{ marginBottom: "25px" }}>Select Professional</BATitle>
      <ToggleButtonGroup
        color="primary"
        value={pro}
        exclusive
        onChange={handleChange}
        sx={toggleStyle}
      >
        <Grid container spacing={2}>
          <EqualHeight>
            {resources.map((data, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card>
                  <ToggleButton
                    value={data.id}
                    sx={ButtonStyles}
                    onClick={() => setBookingDetail("beautician", data)}
                  >
                    <EqualHeightElement name="Name">
                      <CardContent
                        sx={{
                          pt: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Div sx={{ mb: 3 }}>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            sx={{
                              ".MuiBadge-badge": {
                                border: "2px solid #FFF",
                                height: "14px",
                                width: "14px",
                                borderRadius: "50%",
                              },
                            }}
                          >
                            <Avatar
                              sx={{ width: 72, height: 72 }}
                              alt={data.name}
                              src={data.image_url}
                            />
                          </Badge>
                        </Div>
                        <Typography
                          variant={"h5"}
                          mb={0.75}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {data.name}
                        </Typography>
                        <Typography
                          variant={"h6"}
                          color="text.secondary"
                          sx={{ textTransform: "capitalize" }}
                          mb={0.5}
                        >
                          {data.role}
                        </Typography>
                      </CardContent>
                    </EqualHeightElement>
                  </ToggleButton>
                </Card>
              </Grid>
            ))}
          </EqualHeight>
        </Grid>
      </ToggleButtonGroup>
    </>
  );
};

export default QueueSelectProfessional;
