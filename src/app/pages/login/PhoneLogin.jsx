import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Card, CardContent, Typography, alpha } from "@mui/material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React from "react";
import Logo from "/assets/images/alt-logo.png";
import { Colors } from "@app/_themes/TileFlex";
// import { getDocument } from "./Documents";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { gqlQuery } from "@app/_utilities/http";
import { PhoneLoginForm } from "./components/PhoneLoginForm";

export default function PhoneLogin() {
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
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
              "640x428"
            )}) no-repeat center`,
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
                Login By Phone
              </Typography>
              <Typography
                variant={"body1"}
                mb={0.5}
                fontSize={18}
                fontWeight={400}
                lineHeight={1.2}
              >
                Please provide your registered phone number. We will send an OTP
                code.
              </Typography>
              <img
                src={Logo}
                alt="logo"
                style={{
                  width: "120px",
                  // display: "block",
                  // margin: "auto",
                  // marginBottom: "25px",
                  position: "absolute",
                  bottom: 0,
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
          <PhoneLoginForm />
        </CardContent>
      </Card>
    </Div>
  );
}
