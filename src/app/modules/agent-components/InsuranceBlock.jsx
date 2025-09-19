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

import insLogo1 from "/assets/images/askdaysi/insurance/aetna.png";
import insLogo2 from "/assets/images/askdaysi/insurance/cigna.png";
import insLogo3 from "/assets/images/askdaysi/insurance/united.png";
import insLogo4 from "/assets/images/askdaysi/insurance/medicare.png";
import insLogo5 from "/assets/images/askdaysi/insurance/blue-cross.png";
import { setCookie } from "@jumbo/utilities/cookies";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const insuranceCoverage = [
  { id: 6, logo: insLogo1 },
  { id: 2, logo: insLogo2 },
  { id: 3, logo: insLogo3 },
  { id: 1, logo: insLogo4 },
  { id: 4, logo: insLogo5 },
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
var data = {};
var searchParams = {};
var advancedFilterParams = {};
function InsuranceBlock({
  sendToRouter,
  closePopup,
  param,
  actionFx,
  onFileSelect,
}) {
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
    setFormats((p) => [...newFormats]);
    advancedFilterParams["insurance"] = [];
    advancedFilterParams["insurance"] = newFormats;
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
  const handleClose = () => {
    setOpen(false);
  };
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
          <DoctorsList
            searchEnd={searchEnd}
            setSearchEnd={setSearchEnd}
            searchTerm={JSON.stringify(searchParams)}
          />
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
            <b>{t("insurance.title")}</b>
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
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6} lg={4}>
                <JumboCard contentWrapper>
                  <Typography variant="h2">{t("insurance.i1t")}</Typography>
                  <Divider sx={dividerStyle} />

                  <Typography variant="h4">{t("insurance.i1d")}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      actionFx("SEND_MESSAGE", {
                        message: "Tell me more about Insurance Plans",
                      });
                    }}
                    sx={btnStyle}
                  >
                    {t("insurance.lm")}
                  </Button>
                </JumboCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <JumboCard contentWrapper>
                  <Typography variant="h2">{t("insurance.i2t")}</Typography>
                  <Divider sx={dividerStyle} />
                  <Typography variant="h4">{t("insurance.i2d")}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      actionFx("OPEN_FORM", {
                        message: "SEARCH",
                      });
                    }}
                    sx={btnStyle}
                  >
                    {t("insurance.lm")}
                  </Button>
                </JumboCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <JumboCard contentWrapper>
                  <Typography variant="h2">{t("insurance.i3t")}</Typography>
                  <Divider sx={dividerStyle} />
                  <Typography variant="h4">{t("insurance.i3d")}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      actionFx("SEND_MESSAGE", {
                        message:
                          "Tell me more about Benefits Guide and my coverage and benefits",
                      });
                    }}
                    sx={btnStyle}
                  >
                    {t("insurance.lm")}
                  </Button>
                </JumboCard>
              </Grid>
            </Grid>
            {/* //insurace coverage */}
            <Box sx={{ marginTop: "30px", position: "relative" }}>
              <Typography variant="h2">{t("insurance.insCoverage")}</Typography>
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
                  className="chatSlider insSlider"
                >
                  {insuranceCoverage.map((data, index) => (
                    <SwiperSlide>
                      <ToggleButton
                        key={index}
                        value={data.id}
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
              <Button
                variant="contained"
                size="small"
                sx={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  zIndex: "9",
                }}
                onClick={() => {
                  findDoctors();
                }}
              >
                {t("insurance.findDoc")}
              </Button>
            </Box>
          </>
        )}
        {!collapse && (
          <Grid container justifyContent={"center"} sx={{ mt: 2, mb: 2 }}>
            <Grid item>
              <UploadForm
                onFileSelect={onFileSelect}
                inputType="INSURANCE_REPORT"
                title={t("insurance.upText")}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
export default InsuranceBlock;
