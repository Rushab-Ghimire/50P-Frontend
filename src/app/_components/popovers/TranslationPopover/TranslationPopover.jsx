import { useTranslation } from "react-i18next";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Span } from "@jumbo/shared";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import { GLOBAL } from "@app/_utilities/globals";

const TranslationPopover = () => {
  const { i18n } = useTranslation();
  const supportedLngs = {
    en: { name: "English", flag: "US" },
    es: { name: "Spanish", flag: "ES" },
    in: { name: "Hindi", flag: "IN" },
    fr: { name: "French", flag: "FR" },
    zh: { name: "Chinese", flag: "CN" },
    it: { name: "Italian", flag: "IT" },
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    GLOBAL["lang"] = language;
    GLOBAL["lang_tag"] = `in ${supportedLngs[language].name}`;
    handleClose();
  };

  return (
    <Span sx={{ mr: { xs: 0, md: 2.5 } }}>
      <JumboIconButton onClick={handleClick} elevation={23}>
        <ReactCountryFlag
          countryCode={supportedLngs[`${i18n?.language}`]?.flag}
          svg
          style={{ width: 20, height: "auto" }}
        />
      </JumboIconButton>
      <Menu
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        sx={{
          mt: 2,
        }}
      >
        {Object.entries(supportedLngs).map(([code, { name, flag }]) => (
          <MenuItem key={code} onClick={() => handleLanguageChange(code)}>
            <ListItemIcon>
              <ReactCountryFlag
                countryCode={flag}
                svg
                style={{ width: 24, height: 16 }}
              />
            </ListItemIcon>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Menu>
    </Span>
  );
};

export { TranslationPopover };
