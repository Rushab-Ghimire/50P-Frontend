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
import { getPatientProfile, updatePatientProfile } from "./Documents";
import { useArrayState } from "@app/_utilities/helpers";
import LanguageSelector from "@app/modules/AskDaysi/public/components/form-components/LanguageSelector";
import AdvFilterLanguageSelector from "@app/modules/AskDaysi/public/components/form-components/AdvFilterLanguageSelector";
import AdvFilterEthinicitySelector from "@app/modules/AskDaysi/public/components/form-components/AdvFilterEthinicitySelector";
import ReferFriendCode from "../../components/ReferFriend/components/ReferFriendCode";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
});
var formDataUser = {};
var loadedUser = {};
const EditProfilePatient = () => {
  const { userDetail } = useAuth();
  const imageRef = useRef();
  const [phone, setPhone] = React.useState("");
  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const [selLangIds, setSelLangIds] = useArrayState([]);
  const setSelectedLanguages = useCallback((langs) => {
    setSelLangIds((p) => p.splice(0, p.length));
    langs.map((v) => {
      setSelLangIds((p) => {
        p.push(v.id);
      });
    });
    //console.log("selLangIds", selLangIds);
  });

  const [selEthnicityIds, setSelEthnicityIds] = useArrayState([]);
  const setSelectedEthnicity = useCallback((eths) => {
    setSelEthnicityIds((p) => p.splice(0, p.length));
    eths.map((v) => {
      setSelEthnicityIds((p) => {
        p.push(v);
      });
    });
    //console.log("selEthnicityIds", selEthnicityIds, eths);
  });

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["patient_profile", { id: userDetail.id }],
    onSuccess: (dx) => {
      loadedUser = JSON.parse(dx.rows);
      console.log("loadedUser", loadedUser);
      setSelectedLanguages([{ id: loadedUser?.default_language }]);
      setSelectedEthnicity([loadedUser?.default_ethnicity]);
      setPhone(loadedUser?.phone);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData:
          userDetail.id === undefined
            ? -1
            : { gql: getPatientProfile(userDetail.id) },
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

  function submitFormData(files_data) {
    //console.log("files_data", files_data, formDataUser);
    if (files_data?._name !== undefined && files_data?._value != "") {
      formDataUser[files_data._name] = files_data._value;
    }

    formDataUser = {
      ...formDataUser,
      id: userDetail.id,
      default_language: selLangIds[0],
      default_ethnicity: selEthnicityIds[0],
    };
    // console.log("formDataUser X", formDataUser);
    // return;

    mutate({
      inData: { gql: updatePatientProfile(formDataUser) },
      path: `/graphql`,
    });
  }

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
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
            },
          }}
        >
          {loadedUser.id !== undefined && (
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
                app="askdaysi"
                unique_id={
                  loadedUser?.profile_pic_unique_id === undefined
                    ? ""
                    : loadedUser?.profile_pic_unique_id
                }
                field_name={"unique_id"}
                owner_id={loadedUser.id}
                file_key="PROFILE_IMAGE"
                owner_type="user"
                ref={imageRef}
              />
            </Stack>
          )}
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

            <BFormTitle variant={"h3"} sx={{ marginTop: "20px" }}>
              Default Language
            </BFormTitle>
            {Object.keys(loadedUser).length > 0 && (
              <AdvFilterLanguageSelector
                is_multiple={false}
                selected={loadedUser?.default_language}
                setSelectedLanguage={setSelectedLanguages}
                name={"default_languages"}
                labelTitle="Default Language"
                sx={{ marginBottom: "25px" }}
              />
            )}

            <BFormTitle variant={"h3"} sx={{ marginTop: "20px" }}>
              Race or Ethnicity
            </BFormTitle>
            {Object.keys(loadedUser).length > 0 && (
              <AdvFilterEthinicitySelector
                is_multiple={false}
                selected={loadedUser?.default_ethnicity}
                setSelectedEthnicity={setSelectedEthnicity}
                name={"default_ethnicity"}
                labelTitle="Race or Ethnicity"
                sx={{ marginBottom: "25px" }}
              />
            )}
          </Stack>
        </Box>

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
    </JumboCard>
  );
};

export default EditProfilePatient;
