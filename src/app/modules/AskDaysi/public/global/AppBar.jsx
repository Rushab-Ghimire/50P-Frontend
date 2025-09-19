import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import logo from "/assets/images/logo.png";
import { ADLogo } from "../../styles/global";
import { LanguagePopover } from "../components/language";
import { UserPopover } from "../components/UserPopover";
import { Link, useSearchParams } from "react-router-dom";
import UserAccount from "../components/UserAccount";
import Accessibility from "../components/accessibility";
import { Colors } from "../../theme/colors";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { Stack } from "@mui/material";
import AskDaysiAbout from "../dialogs/about";
import aboutIcon from "/assets/images/askdaysi/global/about.png";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const language = ["Spanish", "English", "Hindi", "French"];

function AskDaysiAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { isAuthenticated, loading, userDetail } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [fontSize, setFontSize] = React.useState(16);

  const headerStyle = {
    background: `${Colors.white}`,
    boxShadow: "none",
    borderBottom: `1px solid ${Colors.gray}`,
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const modeOpen = searchParams.get("mode");
  React.useEffect(() => {
    if (modeOpen) {
      if (modeOpen == "about" || modeOpen == "contact") {
        setIsOpen(true);
      }
    }
  }, [modeOpen]);

  return (
    <AppBar position="static" sx={headerStyle}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Stack>
            <Link to="/">
              <ADLogo src={logo} alt="CURA Logo" />
            </Link>
          </Stack>
          {/* <Stack justifyContent={"center"}>
            <Typography
              variant="h2"
              sx={{ mb: 0, cursor: "pointer" }}
              onClick={() => handleOpen()}
            >
              About Us
            </Typography>
          </Stack> */}
          <Stack>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ mr: 2 }}>
                <JumboIconButton elevation={23} onClick={() => handleOpen()}>
                  <img
                    src={aboutIcon}
                    alt="About Icon"
                    style={{ width: "20px" }}
                  />
                </JumboIconButton>
              </Box>
              <AskDaysiAbout
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
              />
              {/* <Accessibility fontSize={fontSize} setFontSize={setFontSize} /> */}
              <LanguagePopover />
              {isAuthenticated && <UserPopover />}
              {!isAuthenticated && <UserAccount />}
            </Box>
          </Stack>
        </Box>
      </Container>
    </AppBar>
  );
}
export default AskDaysiAppBar;
