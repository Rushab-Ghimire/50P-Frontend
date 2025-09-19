import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Card, CardContent, Typography, alpha } from "@mui/material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import React from "react";
import Logo from "/assets/images/alt-logo.png";
import { Colors } from "@app/_themes/TileFlex";

export default function SignUp() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
              >
                Sign Up
              </Typography>
              <Typography
                variant={"body1"}
                mb={2}
                fontSize={18}
                fontWeight={400}
                lineHeight={1.2}
              >
                Please fill this form to create an account!
              </Typography>
            </Div>
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

            {/* <Div sx={{ mt: "auto" }}>
              <Link to="/" underline="none" sx={{ display: "inline-flex" }}>
                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
              </Link>
            </Div> */}
          </Div>
        </CardContent>
        <CardContent
          sx={{
            flex: 1,
            padding: { xs: "32px 15px", md: "32px" },
          }}
        >
          <SignupForm />
          <Typography variant={"body1"}>
            Already have an account?{" "}
            <Link
              to={"/"}
              color={"inherit"}
              underline={"none"}
              sx={{ color: Colors.dark_blue }}
            >
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Div>
  );
}
