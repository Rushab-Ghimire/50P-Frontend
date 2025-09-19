import { Div } from "@jumbo/shared";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }
  return (
    <Div
      sx={{
        py: 2,
        px: { lg: 6, xs: 4 },
        borderTop: 2,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant={"body1"} color={"text.primary"}>
          <CopyrightOutlinedIcon
            fontSize="extra-small"
            sx={{ position: "relative", top: "2px" }}
          />{" "}
          {currentDate} TileFlexAI | All Rights Reserved
        </Typography>
      </Div>
    </Div>
  );
};

export { Footer };
