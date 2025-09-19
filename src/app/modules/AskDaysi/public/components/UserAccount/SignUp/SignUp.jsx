import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Card, CardContent, Typography, alpha } from "@mui/material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Logo from "/assets/images/alt-logo.png";
import { Colors } from "@app/_themes/TileFlex";
import SignInModal from "../../../dialogs/SignIn";
import { useTranslation } from "react-i18next";
import { SignupForm } from "./SignupForm";

export default function AskDaysiSignUp({ mode }) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/askdaysi");
    }
  }, []);

  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: { xs: "0 1 155px", md: "0 1 300px" },
            position: "relative",
            background: `#0267a0 url(/assets/images/askdaysi/auth/daysi-avatar.png) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
              minHeight: "30vh",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={3}
                fontSize={28}
              >
                {t("signup.title")}
              </Typography>
              <Typography
                variant={"body1"}
                mb={2}
                fontSize={18}
                fontWeight={400}
                lineHeight={1.2}
              >
                {t("signup.description")}
              </Typography>
            </Div>
            <img
              src={Logo}
              alt="logo"
              style={{
                width: "120px",
                position: "absolute",
                bottom: 0,
                // backgroundColor: Colors.white,
                // borderRadius: "10px",
                // padding: "8px",
              }}
            />
          </Div>
        </CardContent>
        <CardContent
          sx={{
            flex: 1,
            padding: { xs: "32px 15px", md: "32px" },
          }}
        >
          <SignupForm mode={mode} />
          <Typography variant={"body1"}>
            {t("signup.account")}{" "}
            <Link
              //to={"/askdaysi"}
              color={"inherit"}
              underline={"none"}
              sx={{ color: Colors.dark_blue }}
              onClick={() => handleOpen()}
            >
              {t("signup.signin")}
            </Link>
          </Typography>
          <SignInModal
            isDialogOpened={isOpen}
            handleCloseDialog={() => setIsOpen(false)}
          />
        </CardContent>
      </Card>
    </Div>
  );
}
