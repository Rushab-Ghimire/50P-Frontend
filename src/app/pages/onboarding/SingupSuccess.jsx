import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Button, Card, CardContent, Typography, alpha } from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { TitleText, DescText, BackToSiteBtn } from "@app/_styles/onboarding";
import { useParams } from "react-router-dom";
export default function SingupSuccess() {
  const params = useParams();

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
          textAlign: "center",
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            padding: { xs: "32px 15px", md: "32px" },
          }}
        >
          <TaskAltOutlinedIcon color="success" sx={{ fontSize: "100px" }} />
          {params.mode === undefined && (
            <>
              <TitleText variant="h2">Sign Up Successful</TitleText>
              <DescText>
                Congratulations, your account has been successfully created!
              </DescText>
              <DescText>
                Please check your registered email to activate your account.
              </DescText>
              <Link to="/">
                <BackToSiteBtn variant="contained">
                  Continue to site
                </BackToSiteBtn>
              </Link>
            </>
          )}

          {params.mode === "invite-user" && (
            <>
              <TitleText variant="h2">Invitation Successful</TitleText>
              <DescText>Congratulations, your password has been set.</DescText>
              <DescText>Login to your account.</DescText>
              <Link to="/">
                <BackToSiteBtn variant="contained">
                  Continue to site
                </BackToSiteBtn>
              </Link>
            </>
          )}

          {params.mode === "invite" && (
            <>
              <TitleText variant="h2">Invitation Successful</TitleText>
              <DescText>
                Congratulations, your account has been successfully created!
              </DescText>
              <DescText>
                Please check your registered email to activate your account.
              </DescText>
              <Link to="/">
                <BackToSiteBtn variant="contained">
                  Continue to site
                </BackToSiteBtn>
              </Link>
            </>
          )}

          {params.mode === "password-reset-successful" && (
            <>
              <TitleText variant="h2">Password Updated</TitleText>
              <DescText>
                Your password has been successfully updated. Please use new
                password to login.
              </DescText>
              <Link to="/">
                <BackToSiteBtn variant="contained">
                  Continue to site
                </BackToSiteBtn>
              </Link>
            </>
          )}

          {params.mode === "activation-successful" && (
            <>
              <TitleText variant="h2">Account Activated</TitleText>
              <DescText>
                Your email has been successfully verified. Please log in to
                continue.
              </DescText>
              <Link to="/">
                <BackToSiteBtn variant="contained">
                  Continue to site
                </BackToSiteBtn>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </Div>
  );
}
