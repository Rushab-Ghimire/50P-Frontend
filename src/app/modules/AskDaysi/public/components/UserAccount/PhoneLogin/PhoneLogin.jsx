import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Card, CardContent, Typography, alpha } from "@mui/material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React from "react";
import Logo from "/assets/images/alt-logo.png";
// import { getDocument } from "./Documents";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { gqlQuery } from "@app/_utilities/http";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { AskDaysiPhoneLoginForm } from "./components/PhoneLoginForm";
import { useTranslation } from "react-i18next";

export default function AskDaysiPhoneLogin() {
  const { t } = useTranslation();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/bridge");
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
      {/* <img
        src={Logo}
        alt="logo"
        style={{
          width: "150px",
          display: "block",
          margin: "auto",
          marginBottom: "25px",
        }}
      /> */}
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
          minHeight: "60vh",
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
                sx={{ letterSpacing: 1.5 }}
              >
                {t("phone.title")}
              </Typography>
              <Typography
                variant={"body1"}
                mb={0.5}
                fontSize={18}
                fontWeight={400}
                lineHeight={1.2}
              >
                {t("phone.description")}
              </Typography>
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
          </Div>
        </CardContent>
        <CardContent
          sx={{
            flex: 1,
            padding: { xs: "32px 15px", md: "32px" },
          }}
        >
          <AskDaysiPhoneLoginForm />
        </CardContent>
      </Card>
    </Div>
  );
}
