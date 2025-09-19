import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import moment from "moment";
import * as Yup from "yup";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
  JumboSelect,
} from "@jumbo/vendors/react-hook-form";
import {
  queryClient,
  log,
  sweetAlerts,
  gqlQuery,
  gqlMutate,
  postToBot,
} from "@app/_utilities/http.js";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  MenuItem,
  Select,
  Slide,
  Stack,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
//import { getDocument, createDocument, updateDocument } from "./Documents";
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import { Div, Span } from "@jumbo/shared";
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ContentCutTwoTone, Padding } from "@mui/icons-material";
import { CBFormCol, CBFormWrapper } from "@app/_styles/ChatBot";
import { BouncingDotsLoader, LabelChips } from "@app/_components/apps";
import PhoneInput from "react-phone-input-2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import dayjs from "dayjs";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";

import {
  ASSET_AVATARS,
  GOOGLE_MAP_API_KEY,
  PER_PAGE,
} from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { getColorObject } from "@jumbo/utilities/styleHelpers";
import { GLOBAL } from "@app/_utilities/globals";
import { getCookie, setCookie } from "@jumbo/utilities/cookies";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { AppPagination } from "@app/_components/_core";
import LocationSearch from "./LocationSearch";
import BotSearch from "./BotSearch";
import { APIProvider } from "@vis.gl/react-google-maps";
import GoogleSearch from "../AskDaysi/public/pages/chat/components/GoogleSearch";

var html = "";
function TestComponent({}) {
  const [refresh, setRefresh] = useState(0);

  const onPlaceSelect = useCallback((place) => {
    console.log("place --- ", place);
    let addr = {};
    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          addr["address"] = `${component.long_name} ${address1}`;
          break;
        }

        case "route": {
          addr["address"] =
            (addr["address"] === undefined ? "" : addr["address"]) +
            " " +
            component.short_name;
          break;
        }

        case "postal_code": {
          addr["postcode"] = `${component.long_name}${postcode}`;
          break;
        }

        case "postal_code_suffix": {
          addr["postcode"] = `${postcode}-${component.long_name}`;
          break;
        }
        case "locality":
          addr["locality"] = component.long_name;
          break;
        case "administrative_area_level_1": {
          addr["state"] = component.short_name;
          break;
        }
        case "country":
          addr["country"] = component.long_name;
          break;
      }
    }

    html = "";
    Object.keys(addr).map((v) => {
      html += `<b>${v}</b> : ${addr[v]} <br/>`;
    });

    console.log("html", html);
    setRefresh(refresh + 1);
  });

  return (
    <>
      <Container>
        <Box>
          {/* <br />
          <JumboCard>
            <Stack sx={{ flex: 1 }}>
              <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                <LocationSearch onPlaceSelect={onPlaceSelect} />
                <Box
                  sx={{ padding: "25px", paddingTop: "0px" }}
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                ></Box>
              </APIProvider>
            </Stack>
          </JumboCard>
          <hr /> */}
          <Stack sx={{ flex: 1 }}>
            {/* <BotSearch /> */}
            <GoogleSearch q={""} />
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default TestComponent;
