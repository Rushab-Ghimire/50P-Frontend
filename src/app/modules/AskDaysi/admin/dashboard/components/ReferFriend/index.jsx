import React, { useState } from "react";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { Box, Typography } from "@mui/material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import ReferFriendCode from "./components/ReferFriendCode";

const ReferFriend = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <CardGiftcardOutlinedIcon
          sx={{ fontSize: 64, mb: 2, color: Colors.primary }}
        />
        <Typography variant="h2" textAlign={"center"}>
          Share the referral link with Your Friends or Loved Ones.
          <br />
          Give 1 Month Premium Subscription to them.
        </Typography>
        <Typography variant="h4" textAlign={"center"}>
          And get 3 months premium subscription for yourself
        </Typography>
      </Box>
      <ReferFriendCode />
    </>
  );
};

export default ReferFriend;
