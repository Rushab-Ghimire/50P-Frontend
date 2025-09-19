import React, { useState, useRef, useEffect } from "react";
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
import EditProfilePatient from "./EditProfilePatient";
import EditProfileProvider from "./EditProfileProvider";
import { getRoles } from "@app/_utilities/helpers";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
});
var formDataUser = {};
const EditProfile = () => {
  const { userDetail } = useAuth();
  const [role, setRole] = useState("");

  if (role == "") {
    var roles = getRoles(userDetail.organizations);
    //console.log("roles", roles, userDetail);
    setRole(roles[0]);
  }

  return (
    <>
      {role == "patient" && <EditProfilePatient />}
      {role == "doctor" && <EditProfileProvider />}
    </>
  );
};

export default EditProfile;
