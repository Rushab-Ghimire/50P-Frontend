import React, { useState, useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import {
  queryClient,
  log,
  sweetAlerts,
  gqlQuery,
  gqlMutate,
} from "@app/_utilities/http.js";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import { Box, Button, Stack, Typography } from "@mui/material";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import PhoneInput from "react-phone-input-2";
import {
  getPatientProfile,
  getProviderProfile,
  updatePatientProfile,
  updateProviderProfile,
} from "./Documents";
import CategoryDropDown from "@app/_components/dropdowns/CategoryDropDown";
import LanguageSelector from "@app/modules/AskDaysi/public/components/form-components/LanguageSelector";
import InsuranceSelector from "@app/modules/AskDaysi/public/components/form-components/InsuranceSelector";
import EducationTraining from "@app/modules/AskDaysi/public/components/form-components/EducationTraining";
import AddressDropDown from "@app/modules/AskDaysi/public/components/form-components/AddressDropDown";
import { useArrayState } from "@app/_utilities/helpers";
import SpecializationSelector from "@app/modules/AskDaysi/public/components/form-components/SpecializationSelector";
import GenderSelector from "@app/modules/AskDaysi/public/components/form-components/GenderSelector";
import EthnicitySelector from "@app/modules/AskDaysi/public/components/form-components/EthnicitySelector";
import AdvFilterLanguageSelector from "@app/modules/AskDaysi/public/components/form-components/AdvFilterLanguageSelector";
import ReferFriendCode from "../../components/ReferFriend/components/ReferFriendCode";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
});
var formDataUser = {};
var loadedUser = {};
const EditProfileProvider = () => {
  const { userDetail } = useAuth();
  const imageRef = useRef();
  const [phone, setPhone] = React.useState("");
  const [phone_official, setPhoneOfficial] = React.useState("");
  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["provider_profile", { id: userDetail.id }],
    onSuccess: (dx) => {
      loadedUser = JSON.parse(dx.rows);
      console.log("loadedUser", loadedUser);
      setSelectedSpecialization(loadedUser?.provider?.specialization);
      setSelectedEthnicities(loadedUser?.provider?.ethnicities);
      setSelectedGenders(loadedUser?.provider?.genders);
      setSelectedLanguages(loadedUser?.provider?.languages);
      setSelectedInsurances(loadedUser?.provider?.insurance_accepted);
      setDefaultSelectedLanguages([{ id: loadedUser?.default_language }]);
      setPhone(loadedUser?.phone);
      setPhoneOfficial(loadedUser?.phone_official);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData:
          userDetail.id === undefined
            ? -1
            : { gql: getProviderProfile(userDetail.id) },
      }),
  });

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      sweetAlerts("success", "Profile Updated", Swal, theme);
    },
  });

  const [selEthnicityIds, setSelEthnicityIds] = useArrayState([]);
  const setSelectedEthnicities = useCallback((ethnicities) => {
    //console.log("ethnicities", ethnicities);
    setSelEthnicityIds((p) => p.splice(0, p.length));
    ethnicities.map((v) => {
      setSelEthnicityIds((p) => {
        p.push(v.id);
      });
    });
  });

  const [selGenderIds, setSelGenderIds] = useArrayState([]);
  const setSelectedGenders = useCallback((genders) => {
    setSelGenderIds((p) => p.splice(0, p.length));
    genders.map((v) => {
      setSelGenderIds((p) => {
        p.push(v.id);
      });
    });
  });

  const [selLangIds, setSelLangIds] = useArrayState([]);
  const setSelectedLanguages = useCallback((langs) => {
    setSelLangIds((p) => p.splice(0, p.length));
    langs.map((v) => {
      setSelLangIds((p) => {
        p.push(v.id);
      });
    });
  });

  const setEducationTraining = useCallback((eds) => {});

  const [selInsurances, setSelInsurances] = useArrayState([]);
  const setSelectedInsurances = useCallback((ins, all = []) => {
    //console.log("sel ins", ins, all);
    setSelInsurances((p) => p.splice(0, p.length));

    var hasAll = false;

    ins.map((i) => {
      if (i.id === 0) {
        hasAll = true;
      }
    });

    if (hasAll) {
      all.map((v) => {
        setSelInsurances((p) => {
          p.push(v);
        });
      });
    } else {
      ins.map((v) => {
        setSelInsurances((p) => {
          p.push(v.id);
        });
      });
    }
  });

  const [selSpecializations, setSelSpecialization] = useArrayState([]);
  const setSelectedSpecialization = useCallback((ins) => {
    setSelSpecialization((p) => p.splice(0, p.length));
    ins.map((v) => {
      setSelSpecialization((p) => {
        p.push(v.id);
      });
    });
  });

  function submitFormData(files_data) {
    if (files_data?._name !== undefined && files_data?._value != "") {
      formDataUser[files_data._name] = files_data._value;
    }

    formDataUser.education_training = [];
    var av = document.getElementsByName("abcd");
    for (let e = 0; e < av.length; e++) {
      if (av[e].value.trim() != "") {
        formDataUser.education_training.push(av[e].value.trim());
      }
    }

    formDataUser.phone =
      formDataUser.phone === undefined ? "" : formDataUser.phone;
    formDataUser.phone_official =
      formDataUser.phone_official === undefined
        ? ""
        : formDataUser.phone_official;
    formDataUser.education_training = formDataUser.education_training.join("~");
    formDataUser.languages = selLangIds.join("~");
    formDataUser.genders = selGenderIds.join("~");
    formDataUser.ethnicities = selEthnicityIds.join("~");
    formDataUser.accepted_insurances = selInsurances.join("~");
    formDataUser.specializations = selSpecializations.join("~");

    //formDataUser.appointment_cost = 45;
    //formDataUser.city_id = 4045510;
    formDataUser.is_premium = formDataUser.is_premium ? 1 : 0;
    //formDataUser.state_id = 5879092;

    formDataUser = {
      ...formDataUser,
      id: userDetail.id,
      default_language: selDefaultLangIds[0],
    };

    console.log("formDataUser X", formDataUser);

    mutate({
      inData: { gql: updateProviderProfile(formDataUser) },
      path: `/graphql`,
    });
  }

  const [selDefaultLangIds, setSelDefaultLangIds] = useArrayState([]);
  const setDefaultSelectedLanguages = useCallback((langs) => {
    setSelDefaultLangIds((p) => p.splice(0, p.length));
    langs.map((v) => {
      setSelDefaultLangIds((p) => {
        p.push(v.id);
      });
    });
    //console.log("selDefaultLangIds", langs, selDefaultLangIds);
  });

  function handleSubmit(d) {
    formDataUser = d;
    imageRef.current.doUpload(submitFormData);
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  return (
    <JumboCard contentWrapper>
      <BFormTitle variant={"h3"}>Edit Profile</BFormTitle>
      {Object.keys(loadedUser).length > 0 && (
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              alignItems: "flex-end",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
              },
            }}
          >
            <Stack
              sx={{
                flex: 1,
                textAlign: "center",
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <ReferFriendCode ref_code={loadedUser?.referral_code} />
              <SingleFileUploader
                unique_id={
                  loadedUser?.profile_pic_unique_id === undefined
                    ? ""
                    : loadedUser?.profile_pic_unique_id[0]
                }
                app="askdaysi"
                field_name={"unique_id"}
                owner_id={loadedUser.id}
                file_key="PROFILE_IMAGE"
                owner_type="user"
                ref={imageRef}
              />
            </Stack>
            <Stack
              sx={{
                flex: 1,
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <JumboInput
                fullWidth
                size="small"
                defaultValue={loadedUser.firstName}
                fieldName={"firstName"}
                label={"First Name"}
                sx={{ marginBottom: "25px" }}
              />
              <JumboInput
                fullWidth
                size="small"
                defaultValue={loadedUser.lastName}
                fieldName={"lastName"}
                label={"Last Name"}
                sx={{ marginBottom: "25px" }}
              />
              <JumboInput
                fullWidth
                size="small"
                defaultValue={loadedUser.email}
                fieldName={"email"}
                label={"Email"}
                sx={{ marginBottom: "25px" }}
              />

              <PhoneInput
                specialLabel="Personal Phone"
                size="small"
                international={true}
                withCountryCallingCode={true}
                country={"us"}
                value={loadedUser.phone}
                onChange={(phoneN) => {
                  setPhone("+" + phoneN);
                  console.log(phone);
                }}
                className="mb-20"
              />
              <JumboInput
                className={"hideInput"}
                fieldName={"phone"}
                defaultValue={phone == "" ? data?.phone : phone}
                value={phone == "" ? data?.phone : phone}
              ></JumboInput>

              <PhoneInput
                specialLabel="Official Phone"
                size="small"
                international={true}
                withCountryCallingCode={true}
                country={"us"}
                value={loadedUser.phone_official}
                onChange={(phoneN) => {
                  setPhoneOfficial("+" + phoneN);
                  console.log(phone_official);
                }}
                className="mb-20"
              />
              <JumboInput
                className={"hideInput"}
                fieldName={"phone_official"}
                defaultValue={
                  phone_official == "" ? data?.phone_official : phone_official
                }
                value={
                  phone_official == "" ? data?.phone_official : phone_official
                }
              ></JumboInput>

              <JumboInput
                fullWidth
                size="small"
                defaultValue={loadedUser.description}
                fieldName={"description"}
                label={"Description"}
                multiline
                rows={4}
                sx={{ marginBottom: "25px" }}
              />

              <BFormTitle variant={"h3"} sx={{ marginBottom: "15px" }}>
                Default Language
              </BFormTitle>
              <AdvFilterLanguageSelector
                is_multiple={false}
                selected={loadedUser?.default_language}
                setSelectedLanguage={setDefaultSelectedLanguages}
                name={"default_languages"}
                labelTitle="Default Language"
              />
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              marginTop: "35px",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                marginTop: "0",
                gap: "0px",
              },
            }}
          >
            <Stack
              sx={{
                flex: 1,
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <BFormTitle variant={"h3"}>Address</BFormTitle>
              <AddressDropDown
                state_id={loadedUser.state_id}
                city_id={loadedUser.city_id}
                address={loadedUser.address}
                postal_code={loadedUser.postal_code}
              />
            </Stack>
            <Stack
              sx={{
                flex: 1,
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <BFormTitle variant={"h3"}>Specialization</BFormTitle>
              <SpecializationSelector
                is_multiple={true}
                selected={loadedUser?.provider?.specialization}
                setSelectedSpecialization={setSelectedSpecialization}
                name={"specialization"}
                labelTitle="specialization"
                sx={{ marginBottom: "25px" }}
              />

              <BFormTitle variant={"h3"} sx={{ marginTop: "20px" }}>
                Languages
              </BFormTitle>
              <LanguageSelector
                selected={loadedUser?.provider?.languages}
                setSelectedLanguages={setSelectedLanguages}
                name={"languages"}
                labelTitle="Languages"
                sx={{ marginBottom: "25px" }}
              />

              <BFormTitle variant={"h3"} sx={{ marginTop: "20px" }}>
                Gender
              </BFormTitle>
              <GenderSelector
                isMultiple={false}
                selected={loadedUser?.provider?.genders}
                setSelectedGenders={setSelectedGenders}
                name={"gender"}
                labelTitle="Gender"
                sx={{ marginBottom: "25px" }}
              />

              <BFormTitle variant={"h3"} sx={{ marginTop: "20px" }}>
                Ethnicities
              </BFormTitle>
              <EthnicitySelector
                isMultiple={true}
                selected={loadedUser?.provider?.ethnicities}
                setSelectedEthnicities={setSelectedEthnicities}
                name={"ethnicities"}
                labelTitle="Ethnicities"
                sx={{ marginBottom: "25px" }}
              />
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              marginTop: "15px",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
              },
            }}
          >
            <Stack
              sx={{
                flex: 1,
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <BFormTitle variant={"h3"}>Insurance</BFormTitle>
              <InsuranceSelector
                is_multiple={true}
                selected={loadedUser?.provider?.insurance_accepted}
                setSelectedInsurances={setSelectedInsurances}
                name={"insurances"}
                labelTitle="Insurances"
                sx={{ marginBottom: "25px" }}
              />
            </Stack>
            <Stack
              sx={{
                flex: 1,
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <BFormTitle variant={"h3"} sx={{ marginBottom: "15px" }}>
                Featured Parameters
              </BFormTitle>
              <JumboCheckbox
                fullWidth
                size="small"
                value={"yes"}
                defaultChecked={loadedUser.is_premium}
                fieldName={"is_premium"}
                label={"Is Premium"}
                sx={{ marginBottom: "35px" }}
              />
              <JumboInput
                fullWidth
                size="small"
                defaultValue={
                  loadedUser.appointment_cost
                    ? `${loadedUser.appointment_cost}`
                    : "0"
                }
                fieldName={"appointment_cost"}
                label={"Per Appointment Cost"}
                sx={{ marginBottom: "25px" }}
              />
            </Stack>
          </Box>

          {/* <Box display={"flex"} flexDirection={"column"}>
            <BFormTitle variant={"h3"}>Address</BFormTitle>
            <AddressDropDown
              city_id={loadedUser.city_id}
              address={loadedUser.address}
              postal_code={loadedUser.postal_code}
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ marginBottom: "25px" }}
          >
            <BFormTitle variant={"h3"}>Specialization</BFormTitle>
            <SpecializationSelector
              is_multiple={true}
              selected={loadedUser?.provider?.specialization}
              setSelectedSpecialization={setSelectedSpecialization}
              name={"specialization"}
              labelTitle="specialization"
              sx={{ marginBottom: "25px" }}
            />
          </Box> */}
          {/*
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ marginBottom: "25px" }}
          >
            <BFormTitle variant={"h3"}>Insurance</BFormTitle>
            <InsuranceSelector
              is_multiple={true}
              selected={loadedUser?.provider?.insurance_accepted}
              setSelectedInsurances={setSelectedInsurances}
              name={"insurances"}
              labelTitle="Insurances"
              sx={{ marginBottom: "25px" }}
            />
          </Box> */}

          {/* <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ marginBottom: "25px" }}
          >
            <BFormTitle variant={"h3"}>Languages</BFormTitle>
            <LanguageSelector
              setSelectedLanguages={setSelectedLanguages}
              name={"languages"}
              labelTitle="Languages"
              sx={{ marginBottom: "25px" }}
            />
          </Box> */}

          <Box display={"flex"} flexDirection={"column"}>
            <BFormTitle variant={"h3"}>Education / Training</BFormTitle>
            <EducationTraining
              selected={loadedUser?.provider?.education_training}
              name={"education_training"}
              setEducationTraining={setEducationTraining}
              sx={{ marginBottom: "25px" }}
            />
          </Box>

          {/* <Box display={"flex"} flexDirection={"column"}>
            <BFormTitle variant={"h3"}>Featured Parameters</BFormTitle>
            <JumboCheckbox
              fullWidth
              size="small"
              value={"yes"}
              defaultChecked={loadedUser.is_premium}
              fieldName={"is_premium"}
              label={"Is Premium"}
              sx={{ marginBottom: "35px" }}
            />
            <JumboInput
              fullWidth
              size="small"
              defaultValue={
                loadedUser.appointment_cost
                  ? `${loadedUser.appointment_cost}`
                  : "0"
              }
              fieldName={"appointment_cost"}
              label={"Per Appointment Cost"}
              sx={{ marginBottom: "25px" }}
            />
          </Box> */}

          <Box sx={{ display: "flex", gap: "15px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
          </Box>
        </JumboForm>
      )}
    </JumboCard>
  );
};

export default EditProfileProvider;
