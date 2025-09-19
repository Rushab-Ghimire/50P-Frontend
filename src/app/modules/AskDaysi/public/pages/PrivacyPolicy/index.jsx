import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import AskDaysiAppBar from "../../global/AppBar";

const paragraphStyle = {
  fontSize: "16px",
};

const listStyle = {
  listStyle: "disc",
  paddingLeft: "30px",
  paddingTop: "0",
  "& span": {
    fontSize: "16px",
  },
  "& .MuiListItem-root": {
    display: "revert",
  },
};

const PrivacyPolicyPage = () => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        padding: "0 !important",
        overflow: "hidden",
      }}
    >
      <AskDaysiAppBar />
      <Container>
        <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            At AskDaysi.com, we value your privacy. This Privacy Policy explains
            how we collect, use, and protect your personal information when you
            visit our website.
          </Typography>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Information We Collect
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            We collect information that you provide directly to us when you
            visit our site, such as:
          </Typography>
          <List sx={listStyle}>
            <ListItem disablePadding>
              <ListItemText primary="Personal Identification Information (e.g., name, email)" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Usage Data (e.g., browser type, device information, IP address)" />
            </ListItem>
          </List>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            The information we collect is used for the following purposes:
          </Typography>
          <List sx={listStyle}>
            <ListItem disablePadding>
              <ListItemText primary="To personalize your experience on AskDaysi.com" />
            </ListItem>
            <ListItem disablePaddingdisablePadding>
              <ListItemText primary="To improve our website functionality" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="To communicate with you about updates or promotions" />
            </ListItem>
          </List>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Data Security
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            We use industry-standard security measures to protect your data.
            However, no method of transmission over the internet is 100% secure,
            and we cannot guarantee the absolute security of your information.
          </Typography>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            We use cookies to improve your experience. Cookies are small files
            stored on your device that help us recognize you and improve our
            services. You can manage cookies through your browser settings.
          </Typography>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Third-Party Links
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            Our website may contain links to third-party sites. We are not
            responsible for the content or privacy practices of these websites.
            We encourage you to review their privacy policies before sharing any
            personal information.
          </Typography>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Your Rights
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            You have the right to:
          </Typography>
          <List sx={listStyle}>
            <ListItem disablePadding>
              <ListItemText primary="Access your personal data" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Request correction or deletion of your data" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Opt-out of receiving marketing communications" />
            </ListItem>
          </List>

          <Typography variant="h3" gutterBottom fontWeight={"500"}>
            Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we will update the effective date
            at the bottom of the page.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" paragraph sx={paragraphStyle}>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <Link href="mailto:sales@llcwebtech.com">sales@llcwebtech.com</Link>
            .
          </Typography>

          <Typography variant="body2" color="textSecondary" align="center">
            Effective Date: April 8, 2025
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default PrivacyPolicyPage;
