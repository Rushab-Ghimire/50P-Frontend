import { arTranslation } from "@app/_translations/ar";
import { enTranslation } from "@app/_translations/en";
import { esTranslation } from "@app/_translations/es";
import { frTranslation } from "@app/_translations/fr";
import { itTranslation } from "@app/_translations/it";
import { zhTranslation } from "@app/_translations/zh";

import { enTranslationAD } from "@app/modules/AskDaysi/_translations/en";
import { esTranslationAD } from "@app/modules/AskDaysi/_translations/es";
import { inTranslationAD } from "@app/modules/AskDaysi/_translations/in";
import { frTranslationAD } from "@app/modules/AskDaysi/_translations/fr";
import { cnTranslationAD } from "@app/modules/AskDaysi/_translations/cn";
import { itTranslationAD } from "@app/modules/AskDaysi/_translations/it";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getDefaultLanguage } from "@app/_utilities/helpers";

var lang_resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  es: {
    translation: esTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  it: {
    translation: itTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

if (
  document.location.href.includes("localhost:5173") ||
  document.location.href.includes("health") ||
  document.location.href.includes("staging.daysiai.com")
) {
  lang_resources = {
    en: {
      translation: enTranslationAD,
    },
    es: {
      translation: esTranslationAD,
    },
    in: {
      translation: inTranslationAD,
    },
    fr: {
      translation: frTranslationAD,
    },
    zh: {
      translation: cnTranslationAD,
    },
    it: {
      translation: itTranslationAD,
    },
  };
}

i18n.use(initReactI18next).init({
  lng: getDefaultLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: lang_resources,
});

export default i18n;
