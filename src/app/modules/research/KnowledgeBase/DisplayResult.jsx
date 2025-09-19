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
  styled,
  FormLabel,
  TextField,
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
  BOT_ROUTER_URL,
  GOOGLE_MAP_API_KEY,
  PER_PAGE,
} from "@app/_utilities/constants/paths";
import { getAssetPath, isValidEmail } from "@app/_utilities/helpers";
import { getColorObject } from "@jumbo/utilities/styleHelpers";
import { GLOBAL } from "@app/_utilities/globals";
import { getCookie, setCookie } from "@jumbo/utilities/cookies";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { AppPagination } from "@app/_components/_core";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import ReactMarkdown from "react-markdown";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { LoadingButton } from "@mui/lab";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HumanAnatomy from "./components/HumanAnatomy";

var data = {};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: Colors.white,
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${Colors.gray}`,
    padding: "8px",
  },
}));

const btnStyle = {
  backgroundColor: Colors.white,
  color: Colors.gray_1,
  textTransform: "capitalize",
  borderRadius: "10px",
  xboxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)",
  letterSpacing: "0",
  lineHeight: "22px",
  fontSize: "14px",
  border: `1px solid ${Colors.gray}`,
};

const validationSchema = Yup.object().shape({
  q: Yup.string().required("Search Term is required"),
});

function DisplayResult({ data }) {
  const [annotations, setAnnotations] = useState({});
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });

  useEffect(() => {
    var tmp = {};
    data.text.message?.annotations?.map((i) => {
      tmp[i.file_id] = i;
    });
    setAnnotations((p) => tmp);
  }, []);

  const sendEmail = useCallback(() => {
    //console.log("DX - ", data);

    if (email.trim() == "") {
      setError((o) => {
        return {
          hasError: true,
          message: "Email Address is required",
        };
      });
      return;
    }
    if (!isValidEmail(email)) {
      setError((o) => {
        return {
          hasError: true,
          message: "Email Address appears to be Invalid",
        };
      });
      return;
    }

    window.sendMessage(
      `Emailing file ${data.data.id} - ${email}`,
      false,
      [],
      true
    );
    window.sendMessage(
      `send email to ${email} with file id ${data.data.id}`,
      true,
      [],
      false
    );
  });

  return (
    <Container maxWidth="100%" sx={{ padding: "0px !important" }}>
      {data.SystemStatus && (
        <>
          {data.text == "__EHR_FORM__" && <HumanAnatomy />}
          {data.text == "__EMAIL_FORM__" && (
            <Box sx={{ display: "flex", mb: 2 }}>
              <Stack sx={{ width: "100%", mr: 1 }}>
                <TextField
                  label="Enter Email"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setEmail((x) => e.target.value);
                    setError((o) => {
                      return {
                        hasError: false,
                        message: "",
                      };
                    });
                  }}
                />
                {error.hasError && (
                  <Span sx={{ color: "#ff0000" }}>{error.message}</Span>
                )}
              </Stack>
              <Stack>
                <Button
                  variant="contained"
                  onClick={() => {
                    sendEmail();
                  }}
                >
                  Send
                </Button>
              </Stack>
            </Box>
          )}
          {data.text != "__EHR_FORM__" && data.text != "__EMAIL_FORM__" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                color: "#155724",
                p: 1,
                borderRadius: "5px",
                mb: 3,
              }}
            >
              <CheckCircleOutlineOutlinedIcon />
              <Typography
                variant="h2"
                dangerouslySetInnerHTML={{
                  __html: data.text,
                }}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "16px",
                  mb: 0,
                }}
              />
            </Box>
          )}
        </>
      )}
      {!data.SystemStatus && data.isUserX && (
        <Typography
          variant="h2"
          dangerouslySetInnerHTML={{
            __html: data.text,
          }}
          sx={{ textTransform: "capitalize", fontSize: "28px", mb: 3 }}
        />
      )}
      {!data.SystemStatus && !data.isUserX && (
        <>
          <Box>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {console.log("annotations", annotations)}

              {Object.values(annotations).map((i, k) => (
                <Grid item xs={12} md={6} lg={3}>
                  {console.log("oooo", i)}
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        {i.type == "url_citation" && (
                          <>
                            <Typography
                              color="inherit"
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                                fontSize: "16px",
                                marginBottom: "5px",
                              }}
                            >
                              {i.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "14px", lineHeight: "16px" }}
                            >
                              {i.title}
                            </Typography>
                          </>
                        )}
                        {i.type == "file_citation" && (
                          <>
                            <Typography
                              color="inherit"
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                                fontSize: "16px",
                                marginBottom: "5px",
                              }}
                            >
                              Cited in
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "14px", lineHeight: "16px" }}
                            >
                              {i.filename}
                            </Typography>
                          </>
                        )}
                      </React.Fragment>
                    }
                  >
                    {i.type == "url_citation" && (
                      <Button sx={btnStyle}>{i.title}</Button>
                    )}
                    {i.type == "file_citation" && (
                      <Button sx={btnStyle}>{i.filename}</Button>
                    )}
                  </HtmlTooltip>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box className="mdElements">
            <ReactMarkdown>{data.text.message?.text}</ReactMarkdown>
          </Box>
        </>
      )}
    </Container>
  );
}

export default DisplayResult;
