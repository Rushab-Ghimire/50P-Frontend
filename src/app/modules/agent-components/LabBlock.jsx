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
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Input,
  MenuItem,
  Select,
  Slide,
  Stack,
  Typography,
  Grid,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
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
import { Padding } from "@mui/icons-material";
import { CBFormCol, CBFormWrapper } from "@app/_styles/ChatBot";
import { FileUploader } from "./FileUploader";
import { BouncingDotsLoader } from "@app/_components/apps";
import PhoneInput from "react-phone-input-2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import dayjs from "dayjs";
import DoctorsList from "./DoctorsList";
import { LoadingButton } from "@mui/lab";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Colors } from "../AskDaysi/theme/colors";
import UploadForm from "./UploadForm";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import { APIProvider } from "@vis.gl/react-google-maps";
import { GOOGLE_MAP_API_KEY } from "@app/_utilities/constants/paths";
import LocationSearch from "./LocationSearch";
import InsuranceSelector from "../AskDaysi/public/components/form-components/InsuranceSelector";

import insLogo1 from "/assets/images/askdaysi/lab-report/lab1.png";
import insLogo2 from "/assets/images/askdaysi/lab-report/lab2.png";
import insLogo3 from "/assets/images/askdaysi/lab-report/lab3.png";
import insLogo4 from "/assets/images/askdaysi/lab-report/lab4.png";
import insLogo5 from "/assets/images/askdaysi/lab-report/lab5.png";
import { setCookie } from "@jumbo/utilities/cookies";
import { useArrayState } from "@app/_utilities/helpers";
import AdvLabSelector from "../AskDaysi/public/components/form-components/AdvLabSelector";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const insuranceCoverage = [
  { id: 6, logo: insLogo1, value: "Quest Diagnostics" },
  { id: 2, logo: insLogo2, value: "Northwell Health" },
  { id: 3, logo: insLogo3, value: "Start Diagnostics" },
  { id: 1, logo: insLogo4, value: "American Hospital Association" },
  { id: 4, logo: insLogo5, value: "Florida Hospital" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dividerStyle = {
  marginBottom: "10px",
};

const btnStyle = {
  marginTop: "10px",
  // backgroundColor: Colors.secondary,
};

const validationSchema = Yup.object().shape({
  search: Yup.string().required("Search Term is required"),
});
var addr = {};
var data = {};
var searchParams = {};
var advancedFilterParams = {};

function LabBlock({ sendToRouter, onFileSelect, closePopup, param, actionFx }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [collapse, setCollapse] = React.useState(false);

  useEffect(() => {
    var sf = [...document.getElementsByClassName("search-form-close")];
    sf.pop();
    sf.map((item) => {
      item.click();
    });
  }, []);

  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = useCallback((event, newFormats) => {
    newFormats = [newFormats[newFormats.length - 1]];
    setFormats((p) => [...newFormats]);
    advancedFilterParams["labs"] = [];
    advancedFilterParams["labs"] = newFormats.join(", ");
  });

  const [searchEnd, setSearchEnd] = useState(false);
  const findDoctors = useCallback(() => {
    setSearchEnd(false);
    var d = {};
    d.advancedFilterParams = advancedFilterParams;
    searchParams = d;
    // console.log("searchFormData x", d);

    setCookie("doctorSearchFormData", JSON.stringify(d), 1);
    setOpen(true);
  });

  const toggleStyle = {
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    width: "100%",
    "& .Mui-selected": {
      border: "1px solid #6dcff6 !important",
      borderRadius: "12px",
      backgroundColor: "white !important",
    },
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column",
    // },
  };

  const ButtonStyles = {
    width: "100%",
    border: "1px solid #ccc !important",
    padding: "20px",
    fontWeight: "400",
    borderRadius: "12px !important",
    "& img": {
      width: "100%",
    },
    // [theme.breakpoints.down("lg")]: {
    //   width: "100%",
    // },
    // [theme.breakpoints.down("md")]: {
    //   width: "46%",
    //   gap: "10px",
    // },
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //
  const onPlaceSelect = useCallback((place) => {
    addr = {};
    console.log("place --- ", place);

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          addr["address"] = `${component.long_name}`;
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
          addr["postcode"] = `${component.long_name}`;
          break;
        }

        case "postal_code_suffix": {
          addr["postcode"] = `${component.long_name}`;
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

    // html = "";
    // Object.keys(addr).map((v) => {
    //   html += `<b>${v}</b> : ${addr[v]} <br/>`;
    // });

    //console.log("html", html);
    //setRefresh(refresh + 1);
  });

  const [selInsurances, setSelInsurances] = useArrayState([]);
  const setSelectedInsurances = useCallback((ins) => {
    setSelInsurances((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelInsurances((p) => {
        p.push(v.id);
      });
    });
  });

  const [selLab, setSelLab] = useArrayState([]);
  const setSelectedLab = useCallback((ins) => {
    console.log("ins", ins);
    setSelLab((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelLab((p) => {
        p.push(v.name);
      });
    });

    advancedFilterParams["labs"] = [];
    advancedFilterParams["labs"] = selLab.join(", ");
  });
  //
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              padding: "10px 0",
            }}
          >
            {/* <Stack> */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                right: "20px",
                top: "20px",
                border: `1px solid #000`,
                padding: "3px",
                color: "#000",
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* </Stack> */}
          </Box>
        </Container>
        <Box sx={{ mt: 8 }}>
          {/* PROD_BUILD_3 <DoctorsList mode={"lab"} /> */}
          <Container sx={{ height: "96vh" }}>
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              referrerpolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?zoom=12&key=AIzaSyBcHgkQigSlTdR2kxzaW1FraAHrzV4u5iQ&q=${advancedFilterParams["labs"]}`}
              allowfullscreen
            ></iframe>
          </Container>
        </Box>
      </Dialog>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: "flex",
          minWidth: 0,
          flex: 1,
          flexDirection: "column",
          mb: 0,
        }}
        disableGutters
      >
        <Stack flexDirection={"row"} sx={{ position: "relative" }}>
          <Box sx={{ paddingRight: "35px" }}>
            <b>{t("lab.title")}</b>
          </Box>
          {collapse && (
            <IconButton
              onClick={() => {
                setCollapse(false);
              }}
              sx={{ position: "absolute", right: "0", top: "-10px" }}
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
            // <Button
            //   onClick={() => {
            //     setCollapse(false);
            //   }}
            // >
            //   Open
            // </Button>
          )}
          {!collapse && (
            <IconButton
              className="search-form-close"
              onClick={() => {
                setCollapse(true);
              }}
              sx={{ position: "absolute", right: "0", top: "-10px" }}
            >
              <ExpandLessOutlinedIcon />
            </IconButton>

            // <Button
            //   className="search-form-close"
            //   onClick={() => {
            //     setCollapse(true);
            //   }}
            // >
            //   Close
            // </Button>
          )}
        </Stack>
        {!collapse && (
          <>
            {/* //insurace coverage */}
            <Box sx={{ marginTop: "30px" }}>
              <Typography variant="h2">{t("lab.inNetLab")}</Typography>
              <ToggleButtonGroup
                value={formats}
                onChange={handleFormat}
                sx={toggleStyle}
              >
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination]}
                  className="chatSlider"
                >
                  {insuranceCoverage.map((data, index) => (
                    <SwiperSlide>
                      <ToggleButton
                        key={index}
                        value={data.value}
                        sx={ButtonStyles}
                      >
                        <img
                          src={data.logo}
                          alt="Provider"
                          style={{ height: "50px", width: "auto" }}
                        />
                      </ToggleButton>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h2">{t("lab.findLab")}</Typography>
              <Typography variant="p" sx={{ fontSize: "18px" }}>
                {t("lab.desc")}
              </Typography>
              {/* //form */}
              <Box sx={{ mt: 2 }}>
                <JumboForm
                // validationSchema={validationSchema}
                // onSubmit={handleSubmit}
                // onChange={handleOnChange}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <AdvLabSelector
                        is_multiple={true}
                        selected={selLab}
                        setSelectedLab={setSelectedLab}
                        name={"lab"}
                        labelTitle={t("lab.selectLab")}
                        bgColor="#fff"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                        <LocationSearch onPlaceSelect={onPlaceSelect} />
                      </APIProvider>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InsuranceSelector
                        is_multiple={true}
                        selected={selInsurances}
                        setSelectedInsurances={setSelectedInsurances}
                        name={"insurances"}
                        labelTitle={t("insurance.title")}
                        bgColor="#fff"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size="medium"
                        sx={{
                          backgroundColor: "#c96ee2",
                          [theme.breakpoints.down("md")]: {
                            width: "100%",
                          },
                        }}
                        onClick={handleOpen}
                      >
                        {t("lab.btnText")}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </JumboForm>
              </Box>
            </Box>
          </>
        )}
        {!collapse && (
          <Grid container justifyContent={"center"} sx={{ mt: 2, mb: 2 }}>
            <Grid item>
              <UploadForm
                title={t("lab.upText")}
                onFileSelect={onFileSelect}
                sendToRouter={sendToRouter}
                inputType="MEDICAL_REPORT"
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
export default LabBlock;
