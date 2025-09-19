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
  Input,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
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

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is required"),
  phone: Yup.string().required("Phone Number is required"),
});
var data = {};
function EHRForm({ sendToRouter }) {
  window.sendToRouter = sendToRouter;
  const [isPendingFetch, setIsPendingFetch] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [selGender, setSelGender] = useState("Male");

  const [queueDateTime, setQueueDateTime] = useState(new Date());
  const [phone, setPhone] = React.useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const params = useParams();

  const Swal = useSwalWrapper();
  const theme = useTheme();

  async function handleSubmit(d) {
    setIsPendingFetch(true);
    var formData = new FormData();
    Object.keys(d).forEach((key) => {
      if (d[key] === undefined) d[key] = "";
      formData.append(key, d[key]);
    });

    Object.keys(selectedFile).forEach((key) => {
      if (selectedFile[key] !== undefined)
        formData.append(key, selectedFile[key]);
    });

    formData.append("org_id", params.org_id);

    let dt = moment(queueDateTime).format("YYYY-MM-DD HH:mmZZ");
    formData.append("booking_date_time", dt);

    //console.log("formData", d);

    await postToBot({
      inData: formData,
      path: "/extract",
    });
    setIsPendingFetch(false);
    setAllComplete(true);
    sendToRouter("Thank me for submitted the form.");
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const fieldStyle = {
    marginBottom: "20px",
  };

  const [selectedFile, setSelectedFile] = useState({});

  const onFileSelect = (key, file) => {
    //console.log(key, file, selectedFile);
    setSelectedFile((prev) => {
      prev[key] = file;
      return prev;
    });
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

  return (
    <>
      <JumboCard sx={{ marginTop: "15px" }} contentWrapper>
        {allComplete && (
          <Div sx={{ textAlign: "center" }}>
            <Div>
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: "50px" }}
              />
            </Div>
            <Div>EHR record created</Div>
          </Div>
        )}
        {!allComplete && isPendingFetch && (
          <Div>
            <BouncingDotsLoader />
            <Span sx={{ marginLeft: "20px" }}>Creating your EHR</Span>
          </Div>
        )}

        {!allComplete && !isPendingFetch && (
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <CBFormWrapper>
              <CBFormCol>
                <BFormTitle
                  variant={"h6"}
                  sx={{ marginBottom: "5px", border: "none" }}
                >
                  Personal Details
                </BFormTitle>
                <JumboInput
                  fullWidth
                  size="small"
                  defaultValue={data?.title}
                  fieldName={"full_name"}
                  label={"Full Name"}
                  sx={fieldStyle}
                />
                <JumboInput
                  fullWidth
                  size="small"
                  defaultValue={data?.title}
                  fieldName={"age"}
                  label={"Age"}
                  sx={fieldStyle}
                />

                <JumboSelect
                  fieldName={"gender"}
                  key={"gender"}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Others", label: "Others" },
                  ]}
                  defaultValue={selGender}
                  value={selGender}
                  size="small"
                  onChange={(event) => {
                    setSelGender((prev) => {
                      return event.target.value;
                    });
                  }}
                  sx={fieldStyle}
                />

                <JumboInput
                  fullWidth
                  size="small"
                  defaultValue={data?.title}
                  fieldName={"address"}
                  label={"Address"}
                  sx={{}}
                />
                <Box display={"flex"} flexDirection={"column"}>
                  <BFormTitle
                    variant={"h6"}
                    sx={{ border: "none", margin: "20px 0 2px 0 " }}
                  >
                    Insurance Card
                  </BFormTitle>
                  <FileUploader
                    onFileSelect={onFileSelect}
                    fieldName={"file_insurance_card"}
                  />
                </Box>
              </CBFormCol>
              <CBFormCol>
                <BFormTitle
                  variant={"h6"}
                  sx={{ marginBottom: "5px", border: "none" }}
                >
                  Medical Details
                </BFormTitle>
                <JumboInput
                  fullWidth
                  size="small"
                  defaultValue={data?.title}
                  fieldName={"treatment"}
                  label={"Type of Treatment"}
                  sx={fieldStyle}
                />
                <JumboInput
                  fullWidth
                  size="small"
                  defaultValue={data?.title}
                  fieldName={"doctor"}
                  label={"Doctor (Optional)"}
                  sx={fieldStyle}
                />

                <PhoneInput
                  fullWidth
                  size="small"
                  international={true}
                  withCountryCallingCode={true}
                  country={"us"}
                  onChange={(phoneN) => {
                    setPhone("+" + phoneN);
                  }}
                />
                <JumboInput
                  className={"hideInput"}
                  fieldName={"phone"}
                  defaultValue={phone}
                  value={phone}
                ></JumboInput>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateTimePicker"]}
                    sx={{ paddingTop: "20px" }}
                  >
                    <DateTimePicker
                      defaultValue={dayjs(queueDateTime)}
                      onChange={(date) => {
                        setQueueDateTime((prev) => new Date(date));
                      }}
                      label="Booking Date And Time"
                      sx={dtStyle}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <Box display={"flex"} flexDirection={"column"}>
                  <BFormTitle
                    variant={"h6"}
                    sx={{ border: "none", margin: "20px 0 2px 0 " }}
                  >
                    Diagnostic File
                  </BFormTitle>
                  <FileUploader
                    onFileSelect={onFileSelect}
                    fieldName={"file_diagnostic"}
                  />
                </Box>
              </CBFormCol>
            </CBFormWrapper>
            <Box>
              <Stack>
                <JumboInput
                  fullWidth
                  size="small"
                  defaultValue={data?.title}
                  fieldName={"diagnostics"}
                  label={"Few Diagnostic Details"}
                  multiline
                  rows={4}
                  maxRows={4}
                  sx={{ margin: "20px 0" }}
                />
              </Stack>
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Create eHR
              </Button>
            </Box>
          </JumboForm>
        )}
      </JumboCard>
    </>
  );
}
export default EHRForm;
