import moment from "moment";
import {
  USE_IMAGE_PLACEHOLDERS,
  API_URL,
  GQL_API_URL,
  PUB_SUB_API_URL,
  BOT_ROUTER_URL,
} from "../constants/paths";
import { useCallback, useMemo, useState } from "react";
import { GLOBAL } from "../globals";
import { getCookie, getCookieValue } from "@jumbo/utilities/cookies";

export function getUniqueObjectsArray(array, key) {
  const seen = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    }
    seen.add(keyValue);
    return true;
  });
}

export function getRoles(org) {
  if (org === undefined || org == null) {
    return [];
  }
  return org[0]?.roles.map((itm) => itm.identifier);
}

export function useArrayState(initial = []) {
  const array = useMemo(() => initial, []);
  const [refresh, setRefresh] = useState(0);
  const cb = useCallback((f) => {
    f(array);
    setRefresh((it) => ++it);
  }, []);

  return [array, cb];
}

export const getCustomDateTime = (
  value = 0,
  unit = "days",
  format = "HH:mm a | MMMM DD, YYYY"
) => {
  if (value === 0) {
    return moment().format(format);
  } else {
    return moment().add(value, unit).format(format);
  }
};

export const getFormattedDate = (date, format = "HH:mm a | MMMM DD, YYYY") => {
  if (date === undefined) return "N/A";
  return moment(date).format(format);
};

export const getDateElements = (date) => {
  const dateString = moment(date).format("dddd, MMMM DD YYYY, hh:mm A");
  const dateSections = dateString.split(",");
  const day = dateSections[0];
  const time = dateSections[2];
  const datePart = dateSections[1].trim().split(" ");
  return {
    day,
    time,
    date: {
      dateString: dateSections[1],
      month: datePart[0],
      date: datePart[1],
      year: datePart[2],
    },
  };
};

export const getAssetPath = (url, size) => {
  if (USE_IMAGE_PLACEHOLDERS) {
    return `https://via.placeholder.com/${size}.png`;
  }

  return url;
};

export const isValidEmail = (emailAddress) => {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return pattern.test(emailAddress);
};

export const getAPIUrl = (route) => {
  return `${API_URL + route + "/"}`;
};

export const getGQLAPIUrl = (route) => {
  return `${GQL_API_URL + route}`;
};

export const getPubSubAPIUrl = (route) => {
  return `${PUB_SUB_API_URL}`;
};

export const getBOTUrl = (route) => {
  return `${BOT_ROUTER_URL + route + "/"}`;
};

export const getDefaultLanguage = () => {
  var nLng = "";
  try {
    console.log("default-lang", getCookie("default-lang"));
    if (
      getCookie("default-lang") !== undefined &&
      getCookie("default-lang") !== null &&
      getCookie("default-lang") !== ""
    ) {
      nLng = getCookie("default-lang").split("-");
      nLng = nLng[0].toLowerCase();

      console.log("nLng", nLng);
      return getCookie("default-lang");
    }

    nLng = navigator.language.split("-");
    nLng = nLng[0].toLowerCase();

    console.log("nLng", nLng);

    if (nLng == "hi") {
      return "in";
    } else return nLng.trim();
  } catch (e) {
    return "en";
  }
};
