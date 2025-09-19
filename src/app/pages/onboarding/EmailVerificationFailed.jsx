import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Button, Card, CardContent, Typography, alpha } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { TitleText, DescText, BackToSiteBtn } from "@app/_styles/onboarding";
export default function EmailVerificationFailed() {
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
          <CancelOutlinedIcon color="error" sx={{ fontSize: "100px" }} />
          <TitleText variant="h2">Email Verification Failed </TitleText>
          <DescText>Your email address couldn't be verified</DescText>
          <Link to="/">
            <BackToSiteBtn variant="contained">Continue to site</BackToSiteBtn>
          </Link>
        </CardContent>
      </Card>
    </Div>
  );
}
