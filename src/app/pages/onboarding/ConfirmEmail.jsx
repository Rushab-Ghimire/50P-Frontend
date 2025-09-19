import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Button, Card, CardContent, Typography, alpha } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { TitleText, DescText, BackToSiteBtn } from "@app/_styles/onboarding";
import { useSearchParams } from "react-router-dom";
import { postCall } from "@app/_utilities/http";
import React from "react";
import Spinner from "@app/_shared/Spinner";

export default function EmailVerificationFailed() {
  const [verificationMessage, setVerificationMessage] = React.useState({
    title: "Email verification was not successful.",
    message: "",
    supportText: "If you need further assistance, contact support.",
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get("code");

  const verifyEmailWithCode = async (code) => {
    try {
      const response = await postCall({
        inData: { verification_code: code },
        path: "/user/verify-new-user",
      });
      window.location.href = "/signup-success/activation-successful";
      //window.location.href = "/?severity=success&message=Your email has been successfully verified. Please log in to continue.";
    } catch (error) {
      if (error.info != undefined && error.info.error) {
        var message = error.info.error;
      } else {
        var message =
          "There was problem while verifying the email. Please try again.";
      }
      setVerificationMessage((prev) => {
        return { ...prev, message };
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (verificationCode) {
      verifyEmailWithCode(verificationCode);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <Card
          sx={{
            display: "flex",
            minWidth: 0,
            flexDirection: { xs: "column", md: "row" },
            textAlign: "center",
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              padding: { xs: "32px 15px", md: "32px" },
            }}
          >
            <CancelOutlinedIcon color="error" sx={{ fontSize: "100px" }} />
            <TitleText variant="h2">{verificationMessage.title}</TitleText>
            <DescText>
              {verificationMessage.message} <br />{" "}
              {verificationMessage.supportText}
            </DescText>
            <Link to="/">
              <BackToSiteBtn variant="contained">
                Continue to site
              </BackToSiteBtn>
            </Link>
          </CardContent>
        </Card>
      )}
    </Div>
  );
}
