import React, { useState, useRef } from "react";
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
import { Box, Button, Typography } from "@mui/material";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  getUserDocument,
  createDocument,
  updateUserProfile,
} from "@app/modules/salon/staffs/Documents";
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import PhoneInput from "react-phone-input-2";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
});
var formDataUser = {};
const EditProfile = () => {
  const { userDetail } = useAuth();
  const imageRef = useRef();
  const [phone, setPhone] = React.useState("");
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
    queryKey: ["staff_profile", { id: userDetail.id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData:
          userDetail.id === undefined
            ? -1
            : { gql: getUserDocument(userDetail.id) },
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

    formDataUser = { ...formDataUser, id: userDetail.id };
    //console.log("formDataUser X", formDataUser);
    //return;

    mutate({
      inData: { gql: updateUserProfile(formDataUser) },
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
        <Box display={"flex"} flexDirection={"column"}>
          <JumboInput
            fullWidth
            size="small"
            defaultValue={data?.linkedUser?.firstName}
            fieldName={"firstName"}
            label={"First Name"}
            sx={{ marginBottom: "25px" }}
          />
          <JumboInput
            fullWidth
            size="small"
            defaultValue={data?.linkedUser?.lastName}
            fieldName={"lastName"}
            label={"Last Name"}
            sx={{ marginBottom: "25px" }}
          />
          <JumboInput
            fullWidth
            size="small"
            defaultValue={data?.linkedUser?.email}
            fieldName={"email"}
            label={"Email"}
            sx={{ marginBottom: "25px" }}
          />

          <PhoneInput
            size="small"
            international={true}
            withCountryCallingCode={true}
            country={"us"}
            value={data?.phone}
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

          <SingleFileUploader
            field_name={"unique_id"}
            owner_id={data?.linkedUser?.id}
            file_key="PROFILE_IMAGE"
            owner_type="user"
            ref={imageRef}
          />
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

export default EditProfile;
