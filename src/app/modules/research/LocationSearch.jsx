import React, { useCallback, useEffect, useRef, useState } from "react";
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
  TextField,
  FormLabel,
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
import { APIProvider, useMapsLibrary, Map } from "@vis.gl/react-google-maps";
import { Colors } from "../AskDaysi/theme/colors";

function LocationSearch({ onPlaceSelect }) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    //console.log("11111", places, inputRef.current);
    if (!places || !inputRef.current) return;
    //console.log("11111zzzzz");
    const options = {
      types: ["address"],
      fields: ["address_components"],
    };

    setPlaceAutocomplete(
      (y) => new places.Autocomplete(inputRef.current, options)
    );
  }, [places]);

  useEffect(() => {
    console.log("placeAutocomplete", placeAutocomplete);
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      console.log("place_changed");
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <>
      <Container>
        <Box>
          <Stack sx={{ flex: 1 }}>
            <FormLabel
              sx={{
                color: Colors.gray_1,
                fontSize: "18px",
                marginBottom: "5px",
              }}
            >
              Location Search
            </FormLabel>

            <Box className="autocomplete-container">
              <input
                style={{ width: "90%" }}
                type="text"
                ref={inputRef}
                className="lo-search"
              />
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default LocationSearch;
