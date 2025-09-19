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
import { getAssetPath } from "@app/_utilities/helpers";
import { getColorObject } from "@jumbo/utilities/styleHelpers";
import { GLOBAL } from "@app/_utilities/globals";
import { getCookie, setCookie } from "@jumbo/utilities/cookies";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { AppPagination } from "@app/_components/_core";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import ReactMarkdown from "react-markdown";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Colors } from "../AskDaysi/theme/colors";
import { LoadingButton } from "@mui/lab";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import docPlaceholder from "/assets/images/askdaysi/chat/doctor-avatar.png";
import docIcon from "/assets/images/askdaysi/chat/doctor.png";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";

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
  boxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)",
  letterSpacing: "0",
  lineHeight: "22px",
  fontSize: "14px",
};

const validationSchema = Yup.object().shape({
  q: Yup.string().required("Search Term is required"),
});

function BotSearch({ onPlaceSelect }) {
  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleOnChange = (e) => {
    setFormError({ isError: false, message: "" });
    setProcessing(false);
  };

  const [processing, setProcessing] = useState(false);
  const [refresh, setRefresh] = useState(0);
  async function handleSubmit(d) {
    console.log("DD", d);
    setProcessing(true);

    fetch(`${BOT_ROUTER_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: d.q,
        ai_type: "MEDICAL",
        first_response: false,
      }),
    })
      .then((resp) => resp.json()) // or, resp.text(), etc
      .then((r) => {
        //console.log("response", r);
        setProcessing(false);
        data = r;
        setRefresh(refresh + 1);
      })
      .catch((error) => {
        console.error("error", error);
      });

    //reset the states
    setFullResponse(false);
    setMoreText(true);
  }

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [moreText, setMoreText] = useState(true);
  const [fullResponse, setFullResponse] = useState(false);

  const handleFullMessage = () => {
    setFullResponse(true);
    setMoreText(false);
  };

  const docList = [
    {
      id: 1,
      picture: docPlaceholder,
      name: "Andrija Vidic",
      speciality:
        "Allergist, Advanced Heart Failure and Transplant Cardiologist",
      location: "2415 N Orange Ave Ste 700 , Orlando, Florida",
      teleHealth: "Telehealth Available",
    },
    {
      id: 2,
      picture: docPlaceholder,
      name: "Victor Krupitsky",
      speciality:
        "Allergist, Advanced Heart Failure and Transplant Cardiologist",
      location: "2467 Ocean Ave , Brooklyn, New York",
      teleHealth: "Telehealth Available",
    },
    {
      id: 3,
      picture: docPlaceholder,
      name: "Edward J Gindi",
      speciality:
        "Allergist, Advanced Heart Failure and Transplant Cardiologist",
      location: "1636 E 14th St Ste 108 , Brooklyn, New York",
      teleHealth: "Telehealth Available",
    },
    {
      id: 4,
      picture: docPlaceholder,
      name: "Carolina Cabral",
      speciality:
        "Allergist, Advanced Heart Failure and Transplant Cardiologist",
      location: "100 Madison Ave , Morristown, New Jersey",
      teleHealth: "Telehealth Available",
    },
    {
      id: 5,
      picture: docPlaceholder,
      name: "Dr. Hugh H Windom",
      speciality:
        "Allergist, Advanced Heart Failure and Transplant Cardiologist",
      location: "3570 S Tuttle Ave , Sarasota, Florida",
      teleHealth: "Telehealth Available",
    },
  ];

  return (
    <JumboCard contentWrapper>
      <Container>
        <Box sx={{ marginBottom: "40px" }}>
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <FormLabel
              sx={{
                color: Colors.gray_1,
                fontSize: "18px",
                marginBottom: "5px",
              }}
            >
              Search
            </FormLabel>
            <JumboInput
              fullWidth
              fieldName="q"
              placeholder="Search Term"
              size="small"
              sx={{ backgroundColor: Colors.white, marginBottom: "15px" }}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={processing}
            >
              Search
            </LoadingButton>
          </JumboForm>
        </Box>
        {/* text field
            <input type="text" /> */}
        {/* // */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  icon={<QuestionAnswerOutlinedIcon />}
                  iconPosition="start"
                  label="Answer"
                  value="1"
                />
                <Tab
                  icon={<LocalHospitalOutlinedIcon />}
                  iconPosition="start"
                  label="Connect"
                  value="2"
                />
                <Tab
                  icon={<Diversity3OutlinedIcon />}
                  iconPosition="start"
                  label="Community"
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "24px 0" }}>
              {data.message && moreText && (
                <Box>
                  <Typography variant="body" paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore nesciunt fugit quia nisi, vitae qui natus minima
                    ducimus voluptates laboriosam. Enim eum perspiciatis ex
                    omnis voluptas accusamus. Magnam, numquam provident!
                  </Typography>
                  <Button variant="contained" onClick={handleFullMessage}>
                    View More
                  </Button>
                </Box>
              )}
              {fullResponse && (
                <Box>
                  <Box>
                    <Grid container spacing={4}>
                      {data.message?.annotations?.map((i) => (
                        <Grid item xs={12} md={6} lg={3}>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
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
                              </React.Fragment>
                            }
                          >
                            <Button sx={btnStyle}>{i.title}</Button>
                          </HtmlTooltip>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* {data.message.annotations.map((i) => (
              <p>{i.title}</p>
            ))} */}

                  <Box className="mdElements">
                    <ReactMarkdown>{data.message?.text}</ReactMarkdown>
                  </Box>
                </Box>
              )}
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "24px 0" }}>
              <Grid container spacing={2}>
                {docList.map((data, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <Card variant="outlined" sx={{ boxShadow: "none" }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ width: 48, height: 48, cursor: "pointer" }}
                            alt="Doctor picture"
                            src={data.picture}
                          />
                        }
                        action={
                          <React.Fragment>
                            <Chip
                              label={"Premium"}
                              sx={{
                                bgcolor: "#facc15",
                                color: getColorObject("#facc15"),
                              }}
                            />
                          </React.Fragment>
                        }
                        title={
                          <Typography
                            variant={"h6"}
                            color={"text.primary"}
                            mb={0.25}
                          >
                            {data.name}
                          </Typography>
                        }
                        subheader={
                          <Typography
                            variant={"body1"}
                            color={"text.secondary"}
                          >
                            {data.speciality}
                          </Typography>
                        }
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Divider sx={{ mb: 2 }} />
                        <List disablePadding>
                          <ListItem sx={{ px: 1.5 }}>
                            <ListItemIcon sx={{ minWidth: 50 }}>
                              <AlternateEmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={data.location} />
                          </ListItem>
                          <ListItem sx={{ px: 1.5 }}>
                            <ListItemIcon sx={{ minWidth: 50 }}>
                              <AutoAwesomeOutlinedIcon
                                sx={{
                                  xcolor: "warning.main",
                                  verticalAlign: "middle",
                                  mr: 1,
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <>
                                  <StarIcon
                                    sx={{
                                      color: "warning.main",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "warning.main",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "warning.main",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "warning.main",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "warning.main",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                </>
                              }
                            />
                          </ListItem>
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Div
                          sx={{
                            display: "flex",
                            minWidth: 0,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <React.Fragment>
                            <Stack direction={"row"} spacing={1}>
                              <Chip
                                label={data.teleHealth}
                                sx={{
                                  bgcolor: "#dddddd",
                                  color: getColorObject("#dddddd"),
                                }}
                              />
                            </Stack>
                            <Stack>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  backgroundColor: "#dddddd",
                                  color: "#000000",
                                  borderRadius: "15px",
                                  "&:hover": { color: "#fff" },
                                }}
                              >
                                Book Now
                              </Button>
                            </Stack>
                          </React.Fragment>
                        </Div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value="3" sx={{ padding: "24px 0" }}>
              This is community tab
            </TabPanel>
          </TabContext>
        </Box>
        {/* // */}
      </Container>
    </JumboCard>
  );
}

export default BotSearch;
