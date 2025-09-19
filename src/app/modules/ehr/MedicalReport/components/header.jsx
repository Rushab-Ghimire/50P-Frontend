import React from "react";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { Div } from "@jumbo/shared";
import { Avatar, Badge, Button, Stack, Typography } from "@mui/material";

const MedicalHeader = ({ ehrData }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        pb: 3,
      }}
      mb={2.5}
    >
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          alignItems: "center",
          mr: 2,
        }}
      >
        <Avatar
          alt={""}
          variant="square"
          sx={{ borderRadius: 3, width: 60, height: 60 }}
          src={`${ASSET_AVATARS}/avatar9.jpg`}
        />
        <Div sx={{ flex: "1 1 auto", ml: 2 }}>
          <Typography variant={"h4"} textTransform={"capitalize"} mb={0.5}>
            {ehrData?.profile?.name}
          </Typography>
        </Div>
      </Div>
    </Stack>
  );
};

export default MedicalHeader;
