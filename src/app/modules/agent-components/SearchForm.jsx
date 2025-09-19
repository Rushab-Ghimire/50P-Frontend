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
  Checkbox,
  Container,
  Dialog,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Slide,
  Stack,
  Typography,
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
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { getDropDataState, GLOBAL } from "@app/_utilities/globals";
import { setCookie } from "@jumbo/utilities/cookies";
import { Colors } from "../AskDaysi/theme/colors";

import { APIProvider } from "@vis.gl/react-google-maps";
import {
  ASSET_AVATARS,
  GOOGLE_MAP_API_KEY,
  PER_PAGE,
} from "@app/_utilities/constants/paths";
import LocationSearch from "./LocationSearch";
import InsuranceSelector from "../AskDaysi/public/components/form-components/InsuranceSelector";
import { useArrayState } from "@app/_utilities/helpers";
import EmergencyCall from "../AskDaysi/public/components/EmergencyCall";
var html = "";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogStyle = {
  "& .MuiPaper-root": {
    overflowY: "visible",
    maxWidth: "800px",
  },
};

const validationSchema = Yup.object().shape({
  //search: Yup.string().required("Search Term is required"),
});
var data = {};
let addr = {};
var searchParams = {};
var advancedFilterParams = {};
function SearchForm({ sendToRouter, closePopup, param }) {
  // const [advFilter, setAdvFilter] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const [isPendingFetch, setIsPendingFetch] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchEnd, setSearchEnd] = useState(false);

  useEffect(() => {
    var sf = [...document.getElementsByClassName("search-form-close")];
    sf.pop();
    sf.map((item) => {
      item.click();
    });
  }, []);

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleClose = () => {
    setOpen(false);
    if (closePopup !== undefined) {
      closePopup();
    }
  };

  const params = useParams();

  const Swal = useSwalWrapper();
  const theme = useTheme();

  async function handleSubmit(d) {
    setSearchEnd(false);
    setFormData((prev) => {
      return { ...d };
    });

    advancedFilterParams["insurance"] = [];
    selInsurances.map((i) => {
      advancedFilterParams["insurance"].push(i);
    });
    //console.log("advancedFilterParams ", advancedFilterParams);
    d.location = addr["state"] !== undefined ? addr["state"] : "All";

    if (jQuery("#location-auto-srch").val().trim() == "") {
      d.location = "All";
    }

    d.advancedFilterParams = advancedFilterParams;
    searchParams = d;
    console.log("searchFormData x", d);

    setCookie("doctorSearchFormData", JSON.stringify(d), 1);

    setOpen(true);
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const fieldStyle = {
    // marginBottom: "20px",
  };

  const dtStyle = {
    "& input": {
      padding: "8.5px 14px",
    },
    "& label": {
      top: "-9px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  };

  const advFilterStyle = {
    position: "absolute",
    right: "20px",
    top: "20px",
    border: `1px solid ${Colors.primary}`,
    color: Colors.primary,
    backgroundColor: Colors.white,
    [theme.breakpoints.down("lg")]: {
      position: "fixed",
      top: "45px",
      right: "45px",
    },
  };
  // const handleFilter = () => {
  //   setAdvFilter(true);
  //   setIsClicked(true);
  // };

  // const handleHideFilter = () => {
  //   setAdvFilter(false);
  //   setIsClicked(false);
  // };

  const [openx, setOpenx] = React.useState(false);

  const handleClickOpen = () => {
    setOpenx(true);
  };

  const handleClosex = () => {
    setOpenx(false);
  };

  const handleViewMore = () => {
    setViewMore(true);
    setIsClicked(false);
  };

  const advancedFilter = useCallback((ex) => {
    advancedFilterParams[ex.target.name.replace("[]", "")] = [];
    var av = document.getElementsByName(ex.target.name);
    for (let e = 0; e < av.length; e++) {
      if (av[e].checked == true && !isNaN(av[e].value)) {
        advancedFilterParams[ex.target.name.replace("[]", "")].push(
          av[e].value
        );
      }
    }

    //console.log("advancedFilterParams", advancedFilterParams);
  });

  const searchFieldStyle = {
    flex: 1,
  };

  //search //////

  const [refresh, setRefresh] = useState(0);

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
    setRefresh(refresh + 1);
  });

  //search //////
  const [selInsurances, setSelInsurances] = useArrayState([]);
  const setSelectedInsurances = useCallback((ins) => {
    setSelInsurances((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelInsurances((p) => {
        p.push(v.id);
      });
    });
  });
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
            handleSubmit={handleSubmit}
            searchEnd={searchEnd}
            setSearchEnd={setSearchEnd}
            searchTerm={JSON.stringify(searchParams)}
          />
        </Box>
      </Dialog>
      <Stack flexDirection={"row"} sx={{ position: "relative" }}>
        <Box sx={{ paddingRight: "35px" }}>
          <b>{t("searchForm.search")}:</b> {formData?.search}
        </Box>

        {collapse && (
          <IconButton
            onClick={() => {
              setCollapse(false);
            }}
            sx={{ position: "absolute", right: "-15px", top: "-9px" }}
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
            sx={{ position: "absolute", right: "-15px", top: "-9px" }}
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
        <JumboCard sx={{ marginTop: "15px" }} contentWrapper>
          {!allComplete && !isPendingFetch && (
            <JumboForm
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              onChange={handleOnChange}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <JumboInput
                    fullWidth
                    defaultValue={param?.q}
                    fieldName="search"
                    label={t("searchForm.doctorLabel")}
                    placeholder={t("searchForm.doctorPlaceholder1")}
                    size="small"
                    sx={fieldStyle}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  {/* <JumboSelect
                    fullWidth
                    fieldName="location"
                    label={t("searchForm.location")}
                    formControl={true}
                    size="small"
                    options={getDropDataState()}
                    defaultValue=""
                    sx={fieldStyle}
                  /> */}

                  <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                    <LocationSearch onPlaceSelect={onPlaceSelect} />
                  </APIProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                  {/* <JumboInput
                    fullWidth
                    fieldName="zip-code"
                    label={t("insurance.title")}
                    placeholder={t("insurance.title")}
                    size="small"
                    sx={fieldStyle}
                  /> */}
                  {/* <JumboSelect
                    fullWidth
                    fieldName="insurance"
                    label={t("insurance.title")}
                    formControl={true}
                    size="small"
                    options={getDropDataState()}
                    defaultValue=""
                    sx={fieldStyle}
                  /> */}
                  <InsuranceSelector
                    is_multiple={true}
                    selected={selInsurances}
                    setSelectedInsurances={setSelectedInsurances}
                    name={"insurances"}
                    labelTitle={t("insurance.title")}
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
                  >
                    {t("insurance.findDoc")}
                  </LoadingButton>
                </Grid>
              </Grid>

              {/* <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  [theme.breakpoints.down("md")]: {
                    // flexDirection: "column",
                    gap: "0",
                  },
                }}
              >
                <Stack sx={searchFieldStyle}>
                  <JumboInput
                    fullWidth
                    defaultValue={param?.q}
                    fieldName="search"
                    label={t("searchForm.doctorLabel")}
                    placeholder={t("searchForm.doctorPlaceholder1")}
                    size="small"
                    sx={fieldStyle}
                  />
                </Stack>
                <Stack sx={searchFieldStyle}>
                  <JumboSelect
                    fullWidth
                    fieldName="location"
                    label={t("searchForm.location")}
                    formControl={true}
                    size="small"
                    options={getDropDataState()}
                    defaultValue=""
                    sx={fieldStyle}
                  />
                </Stack>
                <Stack sx={searchFieldStyle}>
                  <JumboInput
                    fullWidth
                    fieldName="zip-code"
                    label={t("insurance.title")}
                    placeholder={t("insurance.title")}
                    size="small"
                    sx={fieldStyle}
                  />
                </Stack>
              </Box> */}
              {/* 
              <Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={fieldStyle}
                  onClick={handleClickOpen}
                >
                  {t("searchForm.filter")}
                </Button>
                <Dialog
                  fullWidth
                  maxWidth="xl"
                  open={openx}
                  onClose={handleClosex}
                  TransitionComponent={Transition}
                >
                  <Container>
                    <Box
                      sx={{
                        display: "flex",
                        padding: "10px 0",
                      }}
                    >
                     <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClosex}
                        aria-label="close"
                        sx={advFilterStyle}
                      >
                        <CloseIcon />
                      </IconButton> 

                      <Button
                        variant="outlined"
                        size="small"
                        sx={advFilterStyle}
                        onClick={handleClosex}
                        aria-label="close"
                      >
                        {t("searchForm.continue")}
                      </Button>
                    </Box>
                  </Container>

                  <Box sx={{ p: 4, pb: 0 }}>
                    <Stack>
                      <Grid container spacing="4" sx={fieldStyle}>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="h5">Ethnicity</Typography>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"ethnicity[]"}
                                  value={1}
                                />
                              }
                              label="Black or African American"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"ethnicity[]"}
                                  value={2}
                                />
                              }
                              label="Latino"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"ethnicity[]"}
                                  value={3}
                                />
                              }
                              label="Indian"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"ethnicity[]"}
                                  value={4}
                                />
                              }
                              label="Chinese"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"ethnicity[]"}
                                  value={5}
                                />
                              }
                              label="English"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"ethnicity[]"}
                                  value={6}
                                />
                              }
                              label="French"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="h5">Language</Typography>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"language[]"}
                                  value={2}
                                />
                              }
                              label="English"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"language[]"}
                                  value={7}
                                />
                              }
                              label="Spanish"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"language[]"}
                                  value={6}
                                />
                              }
                              label="Hindi"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"language[]"}
                                  value={5}
                                />
                              }
                              label="French"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"language[]"}
                                  value={4}
                                />
                              }
                              label="Chinese"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"language[]"}
                                  value={3}
                                />
                              }
                              label="Italian"
                            />
                          </FormGroup>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="h5">Insurance</Typography>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"insurance[]"}
                                  value={1}
                                />
                              }
                              label="Medicare"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"insurance[]"}
                                  value={2}
                                />
                              }
                              label="Cigna"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"insurance[]"}
                                  value={3}
                                />
                              }
                              label="United Health"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"insurance[]"}
                                  value={4}
                                />
                              }
                              label="Blue Cross"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"insurance[]"}
                                  value={5}
                                />
                              }
                              label="Humana"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"insurance[]"}
                                  value={6}
                                />
                              }
                              label="Aetna"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="h5">Gender</Typography>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"gender[]"}
                                  value={1}
                                />
                              }
                              label="Male"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"gender[]"}
                                  value={2}
                                />
                              }
                              label="Female"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    advancedFilter(e);
                                  }}
                                  name={"gender[]"}
                                  value={3}
                                />
                              }
                              label="LGBTQ Friendly"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>

                      <Box sx={{ textAlign: "center" }}>
                        {isClicked && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleViewMore}
                          >
                            View More
                          </Button>
                        )}
                      </Box>
                      {viewMore && (
                        <React.Fragment>
                          <Typography variant="h4" sx={{ mb: 2 }}>
                            Speciality
                          </Typography>
                          <Grid container spacing="4" sx={fieldStyle}>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="h5">General</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(e) => {
                                        advancedFilter(e);
                                      }}
                                      name={"speciality[]"}
                                      value={1}
                                    />
                                  }
                                  label="Allergist"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(e) => {
                                        advancedFilter(e);
                                      }}
                                      name={"speciality[]"}
                                      value={2}
                                    />
                                  }
                                  label="Cardiologist"
                                />
                                <FormControlLabel
                                  name={"speciality[]"}
                                  control={<Checkbox />}
                                  label="Counseling"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="h5">Surgical</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="General Surgery"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Orthopedics"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Cardiothoracic"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="h5">
                                Women's Health
                              </Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Obstetrics"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Gynecology"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Reproductive Medicine"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="h5">Primary Care</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Testing and Monitoring"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Compression Therapy"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Nutrition and Feeding"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )}
                    </Stack>
                  </Box>
                  <Box sx={{ p: 4, pt: 0, textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        border: `1px solid ${Colors.primary}`,
                        color: Colors.primary,
                        [theme.breakpoints.down("lg")]: {
                          display: "none",
                        },
                      }}
                      onClick={handleClosex}
                      aria-label="close"
                    >
                      {t("searchForm.continue")}
                    </Button>
                  </Box>
                </Dialog>
              </Box> */}

              {/* <LoadingButton
                type="submit"
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "#c96ee2",
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                  },
                }}
              >
                {t("insurance.findDoc")}
              </LoadingButton> */}
            </JumboForm>
          )}
        </JumboCard>
      )}
    </>
  );
}
export default SearchForm;
