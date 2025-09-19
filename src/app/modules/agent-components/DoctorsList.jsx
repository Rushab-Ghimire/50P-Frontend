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
import { FileUploader } from "./FileUploader";
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
import { getAssetPath, useArrayState } from "@app/_utilities/helpers";
import { getColorObject } from "@jumbo/utilities/styleHelpers";
import DoctorDetailsDialog from "../AskDaysi/admin/dashboard/dialogs/DoctorDetails";
import { queryDocument, queryDocumentLab } from "./Documents";
import { GLOBAL } from "@app/_utilities/globals";
import { getCookie, setCookie } from "@jumbo/utilities/cookies";
import ErrorComponent from "../AskDaysi/public/components/error";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { AppPagination } from "@app/_components/_core";
import AdvFilterLanguageSelector from "../AskDaysi/public/components/form-components/AdvFilterLanguageSelector";
import AdvFilterInsuranceSelector from "../AskDaysi/public/components/form-components/AdvFilterInsuranceSelector";
import AdvFilterEthinicitySelector from "../AskDaysi/public/components/form-components/AdvFilterEthinicitySelector";
import AdvFilterGenderSelector from "../AskDaysi/public/components/form-components/AdvFilterGenderSelector";
import CircularProgress from "@mui/material/CircularProgress";
import { APIProvider } from "@vis.gl/react-google-maps";
import LocationSearch from "./LocationSearch";
import SelectGroup from "../AskDaysi/public/components/form-components/SelectGroup";
import EthnicitySelector from "../AskDaysi/public/components/form-components/EthnicitySelector";
import SpecializationSelector from "../AskDaysi/public/components/form-components/SpecializationSelector";

export var contacts = [];
let addr = {};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogStyle = {
  "& .MuiPaper-root": {
    overflowY: "visible",
    maxWidth: "800px",
  },
};

const advFilterStyle = {
  postion: "absolute",
  top: "20px",
};

const validationSchema = Yup.object().shape({
  search: Yup.string().required("Search Term is required"),
});
var data = [{}];
function DoctorsList({
  sendToRouter,
  searchTerm = "",
  searchEnd = false,
  setSearchEnd,
  handleSubmit,
  mode = "",
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [stateRendered, setStateRendered] = useState(false);

  const [filter, setFilter] = useState(searchTerm);

  useEffect(() => {
    //console.log("searchTerm", searchTerm);
    try {
      var j = JSON.parse(searchTerm);

      setSelInsurance((p) => p.splice(0, p.length));
      j.advancedFilterParams.insurance.map((v) => {
        setSelInsurance((p) => {
          p.push(v);
        });
      });
    } catch (e) {}

    //console.log("SelInsurance", selInsurance);
  }, []);

  const updateUIState = useCallback(() => {
    //console.log("updateUIState called ", getCookie("doctorSearchSelContact"));
    if (!document.location.href.includes("dashboard")) {
      return;
    }
    if (getCookie("doctorSearchSelContact") === null) {
      return;
    } else if (!stateRendered) {
      if (
        document.getElementById(
          "doctor-" + getCookie("doctorSearchSelContact")
        ) !== null
      ) {
        document
          .getElementById("doctor-" + getCookie("doctorSearchSelContact"))
          .click();
        setStateRendered(true);
        setCookie(
          "doctorSearchSelContactOpenBooking",
          getCookie("doctorSearchSelContact")
        );
      } else {
        setTimeout(updateUIState, 500);
      }
    }
  });

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  const [total, setTotal] = useState(0);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "category",
      {
        gql:
          mode == "lab"
            ? queryDocumentLab(filter, currentPage)
            : queryDocument(filter, currentPage),
      },
    ],
    onSuccess: (dx) => {
      //console.log("allDocs", dx["rows"]);
      setTotal((p) => dx["totalCount"]);
      if (setSearchEnd !== undefined) {
        setSearchEnd(true);
      }

      contacts = [];
      if (mode == "lab") {
        dx["rows"].map((item) => {
          contacts.push({
            mode: "lab",
            id: item.id,
            name: item.title,
            profile_pic: item.logo,
            address: [item.address, item.city?.name, item.state?.name]
              .filter((i) => i !== undefined)
              .join(", "),
            starred: true,
            isPremium: item.isPremium,
            reviews: [],
            about: item.description,
            education_training: [],
            insurance_accepted: item.insuranceProviders,
            languages: [],
            speciality: [],
            labels: [
              { category_id: 1, category_label: "Telehealth Available" },
            ],
          });
        });
      } else {
        dx["rows"].map((item) => {
          contacts.push({
            mode: "doctor",
            id: item.id,
            name: item.name,
            profile_pic: item.profilePic,
            address: [item.address, item.city?.name, item.state?.name]
              .filter((i) => i !== undefined)
              .join(", "),
            starred: true,
            isPremium: item.isPremium,
            reviews: [],
            about: item.description,
            education_training: item.educationTraining.map((vx) => {
              return { title: vx.title };
            }),
            insurance_accepted: item.insuranceAccepted,
            languages: item.languages,
            speciality: item.specialization
              .map((item) => item.title)
              .join(", "),
            labels: [
              { category_id: 1, category_label: "Telehealth Available" },
            ],
          });
        });
      }

      updateUIState();
      setLoading(false);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  const theme = useTheme();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const refreshData = useCallback(() => {
    contacts = [];
    setLoading(true);
    var j = JSON.parse(searchTerm);
    var d = {};
    d.location = addr["state"] !== undefined ? addr["state"] : j.location;
    if (d.location === undefined) {
      d.location = "All";
    }

    var advancedFilterParams = {};
    advancedFilterParams["insurance"] = [];
    selInsurance.map((i) => {
      advancedFilterParams["insurance"].push(i);
    });

    advancedFilterParams["language"] = [];
    selLanguage.map((i) => {
      advancedFilterParams["language"].push(i);
    });

    advancedFilterParams["ethnicity"] = [];
    selEthnicity.map((i) => {
      advancedFilterParams["ethnicity"].push(i);
    });

    advancedFilterParams["speciality"] = [];
    selSpeciality.map((i) => {
      if (i > 0) {
        advancedFilterParams["speciality"].push(i);
      }
    });

    advancedFilterParams["gender"] = [];
    selGender.map((i) => {
      advancedFilterParams["gender"].push(i);
    });

    d.advancedFilterParams = advancedFilterParams;
    //console.log("refreshData", d);
    setFilter((p) => JSON.stringify(d));

    setCookie("doctorSearchFormData", JSON.stringify(d), 1);

    queryClient.invalidateQueries({
      queryKey: ["category"],
      refetchType: "all",
    });
    setRefresh((r) => r + 1);
  });

  const advFilterStyle = {
    position: "absolute",
    top: "20px",
    [theme.breakpoints.down(1050)]: {
      position: "static",
      marginBottom: "15px",
    },
  };

  const advFilterBoxStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    [theme.breakpoints.down(1050)]: {
      "& .MuiStack-root": {
        marginBottom: "10px",
      },
    },
  };

  const advFilterStackStyle = {
    flex: 1,
    [theme.breakpoints.down(1050)]: {
      width: "calc(50% - 5px)",
      flex: "unset",
    },
  };

  const advFilterButtonStyle = {
    [theme.breakpoints.down(600)]: {
      width: "100%",
    },
  };

  const [selSpeciality, setSelSpeciality] = useArrayState([]);
  const setSelectedSpeciality = useCallback((ins) => {
    setSelSpeciality((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelSpeciality((p) => {
        p.push(Number(v.id));
      });
    });
    //console.log("selSpeciality", selSpeciality);
  });

  const [selEthnicity, setSelEthnicity] = useArrayState([]);
  const setSelectedEthnicity = useCallback((ins) => {
    setSelEthnicity((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelEthnicity((p) => {
        p.push(v.id);
      });
    });
    // console.log("selEthnicity", selEthnicity);
  });

  const [selLanguage, setSelLanguage] = useArrayState([]);
  const setSelectedLanguage = useCallback((ins) => {
    setSelLanguage((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelLanguage((p) => {
        p.push(v.id);
      });
    });
    //console.log("selLanguage", selLanguage);
  });

  const [selInsurance, setSelInsurance] = useArrayState([]);
  const setSelectedInsurance = useCallback((ins) => {
    setSelInsurance((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelInsurance((p) => {
        p.push(v);
      });
    });
    //console.log("selInsurance", selInsurance);
  });

  const [selGender, setSelGender] = useArrayState([]);
  const setSelectedGender = useCallback((ins) => {
    setSelGender((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelGender((p) => {
        p.push(v.id);
      });
    });
    //console.log("selGender", selGender);
  });

  const onPlaceSelect = useCallback((place) => {
    //console.log("place --- ", place);
    addr = {};
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

  return (
    <>
      {!loading && searchEnd && contacts.length <= 0 && (
        <ErrorComponent
          title="Doctors Not Found!"
          message="No Doctors found in our Database matching your Search Criteria."
        />
      )}

      <Container sx={advFilterStyle}>
        <Box sx={advFilterBoxStyle}>
          {/* <Stack sx={advFilterStackStyle}>
            <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
              <LocationSearch onPlaceSelect={onPlaceSelect} />
            </APIProvider>
          </Stack> */}

          {mode !== "lab" && (
            <Stack sx={advFilterStackStyle}>
              <SpecializationSelector
                is_multiple={true}
                selected={[]}
                setSelectedSpecialization={setSelectedSpeciality}
                name={"specialization"}
                labelTitle="specialization"
                sx={{ marginBottom: "25px" }}
              />
            </Stack>
          )}

          {mode !== "lab" && (
            <Stack sx={advFilterStackStyle}>
              <EthnicitySelector
                isMultiple={true}
                selected={selEthnicity}
                setSelectedEthnicities={setSelectedEthnicity}
                labelTitle="Ethinicity"
              />
            </Stack>
          )}

          {mode !== "lab" && (
            <Stack sx={advFilterStackStyle}>
              <AdvFilterLanguageSelector
                is_multiple={true}
                selected={selLanguage}
                setSelectedLanguage={setSelectedLanguage}
                labelTitle="Language"
              />
            </Stack>
          )}
          <Stack sx={advFilterStackStyle}>
            <AdvFilterInsuranceSelector
              is_multiple={true}
              selected={selInsurance}
              setSelectedInsurance={setSelectedInsurance}
              labelTitle="Insurance"
            />
          </Stack>
          {mode !== "lab" && (
            <Stack sx={advFilterStackStyle}>
              <AdvFilterGenderSelector
                is_multiple={true}
                selected={selGender}
                setSelectedGender={setSelectedGender}
                labelTitle="Gender"
              />
            </Stack>
          )}
          <Stack sx={advFilterButtonStyle}>
            <Button
              onClick={refreshData}
              variant="contained"
              sx={advFilterButtonStyle}
            >
              {mode == "lab" ? "Find Labs" : t("insurance.findDoc")}
            </Button>
          </Stack>
        </Box>
      </Container>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
            height: "60vh",
          }}
        >
          <CircularProgress />
          <Typography variant="h4">
            Searching For {mode == "lab" ? "Labs" : "Doctors"}
          </Typography>
        </Box>
      )}

      {contacts.length > 0 && (
        <Grid
          container
          spacing={3}
          sx={{ p: (theme) => theme.spacing(1, 3, 3) }}
        >
          {contacts.map((row, index) => (
            <DoctorGridItem key={"dgi-" + index} contact={row} />
          ))}
        </Grid>
      )}

      {contacts && contacts.length > 0 && (
        <AppPagination
          current_page={currentPage}
          current_rowsPerPage={12}
          totalRows={total}
          onHandleChangePage={handlePage}
        />
      )}
    </>
  );
}

const DoctorGridItem = ({ contact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selContact, setSelContact] = useState();
  const [openBookingForm, setOpenBookingForm] = useState(false);
  const handleOpen = (contact, open_booking_form = false) => {
    setSelContact(contact);
    setOpenBookingForm(open_booking_form);
    setIsOpen(!isOpen);
    setCookie("doctorSearchSelContact", contact.id, 1);
  };
  return (
    <Grid item xs={12} lg={4}>
      <Card variant="outlined" sx={{ boxShadow: "none" }}>
        <CardHeader
          avatar={
            <Avatar
              onClick={() => handleOpen(contact)}
              sx={{ width: 48, height: 48, cursor: "pointer" }}
              alt={contact.name}
              src={contact.profile_pic}
            />
          }
          action={
            <React.Fragment>
              {contact.isPremium && (
                <Chip
                  label={"Premium"}
                  sx={{
                    bgcolor: "#facc15",
                    color: getColorObject("#facc15"),
                  }}
                />
              )}
            </React.Fragment>
          }
          title={
            <Typography variant={"h6"} color={"text.primary"} mb={0.25}>
              {contact.name}
            </Typography>
          }
          subheader={
            <Typography variant={"body1"} color={"text.secondary"}>
              {contact.speciality}
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
              <ListItemText
                primary={
                  contact.address.trim() != "" ? contact.address.trim() : "-"
                }
              />
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
                  contact.reviews.length <= 0 ? (
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
                  ) : (
                    contact.reviews.length + " Review(s)"
                  )
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
            {contact?.labels?.length == 0 ? null : (
              <React.Fragment>
                <Stack direction={"row"} spacing={1}>
                  {contact.labels.map((item) => (
                    <Chip
                      key={contact.id + "-" + item.category_id}
                      label={item.category_label}
                      sx={{
                        bgcolor: "#dddddd",
                        color: getColorObject("#dddddd"),
                      }}
                    />
                  ))}
                </Stack>
                <Stack>
                  <Button
                    id={"doctor-" + contact.id}
                    onClick={() => handleOpen(contact, true)}
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
            )}
            <DoctorDetailsDialog
              openBookingForm={openBookingForm}
              contact={selContact}
              isDialogOpened={isOpen}
              handleCloseDialog={() => setIsOpen(false)}
            />
          </Div>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default DoctorsList;
