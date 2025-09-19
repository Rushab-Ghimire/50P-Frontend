import React, { useState } from "react";
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
  search: Yup.string().required("Search Term is required"),
});
var data = {};
function UploadForm({
  sendToRouter,
  closePopup,
  param,
  onFileSelect,
  title,
  fieldId,
  fileUploadMessage,
  uploadIconPosition,
  uploadIconGap,
  inputType,
}) {
  const { t } = useTranslation();

  return (
    <>
      <JumboCard
        sx={{
          margin: "15px 0 12px 0",
          border: `2px dashed #ccc`,
        }}
        contentWrapper
      >
        <FileUploader
          icon={true}
          icon_type="base"
          onFileSelect={onFileSelect}
          inputType={inputType}
          fieldName={fieldId === undefined ? "input_file" : fieldId}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: uploadIconPosition ? "row" : "column",
              justifyContent: "center",
              alignItems: "center",
              gap: uploadIconGap ? `${uploadIconGap}` : 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-upload w-6 h-6 text-gray-400 animate-float"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
            <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
              {title ? title : t("insurance.fu")}
            </Typography>
            {/* <Typography variant="h5">{t("insurance.drag")}</Typography> */}
            {fileUploadMessage ? (
              ""
            ) : (
              <Typography variant="h5">{t("insurance.drag")}</Typography>
            )}
          </Box>
        </FileUploader>
      </JumboCard>
    </>
  );
}
export default UploadForm;
