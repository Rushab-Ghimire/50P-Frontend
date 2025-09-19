import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useTranslation } from "react-i18next";

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

const outTitleStyle = { mt: 2 };

const TermsOfServiceContent = () => {
  const { t } = useTranslation();
  return (
    <section>
      <Typography variant="h3" gutterBottom fontWeight={"500"}>
        {t("terms.title1")}
      </Typography>
      <Typography variant="p" paragraph sx={paragraphStyle}>
        {t("terms.content1")}
      </Typography>

      <Typography
        variant="h2"
        gutterBottom
        fontWeight={"500"}
        sx={outTitleStyle}
      >
        {t("terms.title2")}
      </Typography>
      <Box sx={{ ml: 3 }}>
        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title21")}
        </Typography>
        <Typography variant="body1" paragraph sx={paragraphStyle}>
          {t("terms.content21")}
        </Typography>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title22")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list221")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list222")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list223")} />
          </ListItem>
        </List>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title23")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list231")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list232")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list233")} />
          </ListItem>
        </List>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title24")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list241")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list242")} />
          </ListItem>
        </List>
      </Box>

      <Typography
        variant="h2"
        gutterBottom
        fontWeight={"500"}
        sx={outTitleStyle}
      >
        {t("terms.title3")}
      </Typography>
      <Box sx={{ ml: 3 }}>
        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title31")}
        </Typography>
        <Typography variant="body1" paragraph sx={paragraphStyle}>
          {t("terms.content31")}
        </Typography>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title32")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list321")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list322")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list323")} />
          </ListItem>
        </List>

        <Typography variant="h3" fontWeight={"500"}>
          {t("terms.title33")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list331")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list332")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list333")} />
          </ListItem>
        </List>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title34")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list341")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list342")} />
          </ListItem>
        </List>
      </Box>
      <Typography
        variant="h2"
        gutterBottom
        fontWeight={"500"}
        sx={outTitleStyle}
      >
        {t("terms.title4")}
      </Typography>
      <Box sx={{ ml: 3 }}>
        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title41")}
        </Typography>
        <Typography variant="body1" paragraph sx={paragraphStyle}>
          {t("terms.content41")}
        </Typography>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title42")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list421")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list422")} />
          </ListItem>
        </List>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title43")}
        </Typography>
        <List sx={listStyle}>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list431")} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={t("terms.list432")} />
          </ListItem>
        </List>

        <Typography variant="h3" gutterBottom fontWeight={"500"}>
          {t("terms.title44")}
        </Typography>
        <Typography variant="body1" paragraph sx={paragraphStyle}>
          {t("terms.content44")}
        </Typography>
      </Box>
      <Typography variant="body1" align="center" paragraph sx={paragraphStyle}>
        {t("terms.question")}{" "}
        <Link href="mailto:info@llcwebtech.com"> {t("terms.email")}</Link>.
      </Typography>

      <Typography variant="body1" align="center" paragraph sx={paragraphStyle}>
        {t("terms.disclaimer")}
      </Typography>
    </section>
  );
};

export default TermsOfServiceContent;
