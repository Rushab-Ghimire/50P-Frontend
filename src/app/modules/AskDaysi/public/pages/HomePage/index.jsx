import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AskDaysiAppBar from "../../global/AppBar";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import {
  ADBtn,
  ADContentWrapper,
  ADDaysi,
} from "@app/modules/AskDaysi/styles/homepage";
import Footer from "../../global/footer";
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";
import daysi from "/assets/images/askdaysi/chat/daysi.png";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
const HomePage = () => {
  const containerRef = React.useRef(null);
  return (
    <Container
      maxWidth="100%"
      sx={{
        padding: "0 !important",
        overflow: "hidden",
      }}
    >
      <AskDaysiAppBar />
      <ADContentWrapper ref={containerRef}>
        <Box textAlign={"center"}>
          <Slide direction="up" in container={containerRef.current}>
            <ADDaysi src={daysi} alt="Daysi" className="ani-e1" />
          </Slide>
          <Slide direction="up" in container={containerRef.current}>
            <Link to="/askdaysi/chat">
              <Box className="hero-btn ani-e1">
                <Typography variant="span">Ask Daysi</Typography>
                <SupportAgentOutlinedIcon
                  sx={{
                    color: `${Colors.secondary}`,
                    fontSize: "40px !important",
                  }}
                />
              </Box>
            </Link>
          </Slide>
        </Box>
      </ADContentWrapper>
      {/* <Footer /> */}
    </Container>
  );
};

export default HomePage;
