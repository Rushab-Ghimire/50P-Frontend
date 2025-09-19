import React, { useCallback, useEffect, useRef, useState } from "react";
import UploadForm from "@app/modules/agent-components/UploadForm";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { DocFormLabel } from "@app/modules/AskDaysi/styles/admin/doctor";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import SignInModal from "@app/modules/AskDaysi/public/dialogs/SignIn";
import SignUpModal from "@app/modules/AskDaysi/public/dialogs/SignUp";
import ConfirmationDialog from "../../../dialogs/confirmation";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useMutation } from "react-query";
import { gqlMutate, uploadFile } from "@app/_utilities/http";
import { bookPatientAppointment, bookLabAppointment } from "./Document";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { eraseCookie } from "@jumbo/utilities/cookies";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getProviderTimeSlotsByDateDocument } from "../../../pages/Timeslots/Documents";
import ErrorComponent from "@app/modules/AskDaysi/public/components/error";
import { CircularProgressLoader } from "@app/_styles/ModuleModal";
import { getFormattedDate } from "@app/_utilities/helpers";
import moment from "moment";
import { InsuranceChecker } from "../../InsuranceChecker";

const formStyle = {
  marginTop: "20px",
};

const ButtonStyles = {
  width: "90px",
  border: "1px solid #ccc !important",
  padding: "6px 12px",
  fontWeight: "400",
  borderRadius: "8px !important",
};

const toggleStyle = {
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "10px",
  width: "100%",
  "& .Mui-selected": {
    border: "1px solid #6dcff6 !important",
    borderRadius: "8px",
    backgroundColor: "#6dcff6 !important",
    color: "#fff !important",
  },
};

var timeSet = [];

const validationSchema = Yup.object().shape({
  //comment: Yup.string().required("Comment is required"),
});

const PatientBookingForm = ({ providerId, mode }) => {
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadFileX, setUploadFileX] = useState();
  const [uploadFileInsuranceX, setUploadFileInsuranceX] = useState();
  const [bookingDateTime, setBookingDateTime] = useState(new Date());

  const navigate = useNavigate();
  const [loadingTimeslots, setLoadingTimeslots] = useState(false);
  useEffect(() => {
    renderTimeSlots();
  }, []);

  const renderTimeSlots = useCallback((d) => {
    if (d === undefined) {
      d = new Date();
    }
    setLoadingTimeslots(true);
    setTime("");
    selErrorSelectTimeslot(false);
    mutate({
      inData: {
        gql: getProviderTimeSlotsByDateDocument(d, providerId, mode),
      },
      path: `/graphql`,
      onSuccess: (dx) => {
        setLoadingTimeslots(false);
        timeSet = [];
        if (dx.getProviderTimeSlotsByDate.data[0] === undefined) {
          return;
        }
        dx.getProviderTimeSlotsByDate.data[0].slots.map((i) => {
          timeSet.push({
            id: i.id,
            slot: i.slot,
            time: getFormattedDate(
              moment(i.fullDateTime, "YYYY-MM-DD HH:mm").toDate(),
              "hh:mm a"
            ),
          });
        });

        setLoadingTimeslots(false);
      },
    });
  });

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSingUp = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSuccess = () => {
    setIsSuccess(!isSuccess);
  };

  const handleOnChange = (e) => {
    setFormError({ isError: false, message: "" });
  };

  const onFileSelect = (key, file) => {
    setUploadFileX(file);
  };

  const onFileSelectInsurance = (key, file) => {
    setUploadFileInsuranceX(file);
  };

  const [errorSelectTimeslot, selErrorSelectTimeslot] = useState(false);
  async function handleSubmit(d) {
    if (time.trim() == "") {
      selErrorSelectTimeslot(true);
      setTimeout(() => {
        document.querySelector("#timeslot-validation")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
      return;
    }

    var iO = insuranceCheckerRef.current.getValues();
    // console.log("iO", iO);
    // return;

    var formData = new FormData();
    var unq = uuid();
    var uniqueId = unq;
    if (uploadFileX !== undefined) {
      formData.append("unique_id", unq);
      formData.append("file_path", uploadFileX);
      await uploadFile({
        inData: formData,
        path: "/ad/upload-document",
      });
    } else {
      unq = "";
    }

    var unqInsurance = uuid();
    uniqueId = unqInsurance;
    formData = new FormData();
    if (uploadFileInsuranceX !== undefined) {
      formData.append("unique_id", unqInsurance);
      formData.append("file_path", uploadFileInsuranceX);
      await uploadFile({
        inData: formData,
        path: "/ad/upload-document",
      });
    } else {
      unqInsurance = "";
    }

    var datePart = getFormattedDate(bookingDateTime, "YYYY-MM-DD");
    datePart = datePart + " " + time;
    var bookDTime = moment(datePart).toDate();

    d.bookingDateTime = bookDTime;
    d.providerId = providerId;
    d.reportFileUuid = unq;
    d.insuranceFileUuid = unqInsurance;
    d.postalCode = d.postal_code === undefined ? "" : d.postal_code;

    d.insuranceProvider =
      iO.insurance_provider === undefined ? "" : iO.insurance_provider;
    d.subscriptionNumber =
      iO.subscription_number === undefined ? "" : iO.subscription_number;
    d.memberId = iO.member_id === undefined ? "" : iO.member_id;

    //console.log("Data - ", d);

    setProcessing(true);
    mutate({
      inData: {
        gql: mode == "lab" ? bookLabAppointment(d) : bookPatientAppointment(d),
      },
      path: "/graphql",
      onSuccess: (d) => {
        setIsSuccess(true);
        setProcessing(false);
      },
    });
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  const [time, setTime] = useState("");

  const handleTime = (event, newTime) => {
    setTime(newTime);
    selErrorSelectTimeslot(false);
  };

  const insuranceCheckerRef = useRef(null);

  return (
    <>
      <Divider sx={{ padding: "20px 0 0 0", marginBottom: "20px" }} />
      {!isAuthenticated ? (
        <Box>
          <Typography variant="h3">You need to login to continue!</Typography>
          <Button variant="contained" size="small" onClick={() => handleOpen()}>
            Login
          </Button>{" "}
          or{" "}
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleSingUp()}
          >
            Create an Account
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" fontWeight={"500"}>
            Book an Appointment
          </Typography>
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <Box sx={formStyle}>
              <DocFormLabel>Select Date</DocFormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    defaultValue={dayjs(bookingDateTime)}
                    onChange={(date) => {
                      setBookingDateTime((d) => new Date(date));
                      renderTimeSlots(new Date(date));
                    }}
                    label="Select Date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <Box id="timeslot-validation" sx={formStyle}>
              <DocFormLabel sx={{ mb: 1 }}>Select Time</DocFormLabel>
              {loadingTimeslots && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <CircularProgressLoader />
                  <Typography variant="h4">
                    Loading Available Timeslots
                  </Typography>
                </Box>
              )}
              {!loadingTimeslots && timeSet.length <= 0 && (
                <Alert severity="error">
                  <Typography variant="h4">
                    No Timeslots Available for this Date.
                  </Typography>
                </Alert>
              )}

              {errorSelectTimeslot && timeSet.length > 0 && (
                <Alert sx={{ marginBottom: "10px" }} severity="error">
                  <Typography variant="h4">
                    Please Select Booking Timeslot
                  </Typography>
                </Alert>
              )}

              {!loadingTimeslots && timeSet.length > 0 && (
                <ToggleButtonGroup
                  value={time}
                  exclusive
                  onChange={handleTime}
                  sx={toggleStyle}
                >
                  {timeSet.map((data, index) => (
                    <ToggleButton
                      key={index}
                      value={data.slot}
                      sx={ButtonStyles}
                    >
                      {data.time}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            </Box>

            {/* <Box sx={formStyle}>
              <DocFormLabel sx={{ marginBottom: "5px" }}>
                Postal Code
              </DocFormLabel>
              <JumboInput
                fullWidth
                defaultValue={""}
                fieldName="postal_code"
                placeholder="Your Postal Code"
                size="small"
              />
            </Box> */}
            <Box sx={formStyle}>
              <UploadForm
                fieldId="patient_booking_file"
                onFileSelect={onFileSelect}
                title="Upload your report"
                uploadIconPosition="row"
                uploadIconGap="10px"
                fileUploadMessage="Don't Display" //add this prop to hide "Drag & drop or click to upload" message
              />
            </Box>
            <Box sx={formStyle}>
              <UploadForm
                fieldId="patient_booking_insurance"
                onFileSelect={onFileSelectInsurance}
                title="Upload your Insurance Card"
                uploadIconPosition="row"
                uploadIconGap="10px"
                fileUploadMessage="Don't Display" //add this prop to hide "Drag & drop or click to upload" message
              />
            </Box>
            <InsuranceChecker ref={insuranceCheckerRef} ftWeight="400" />
            <Box sx={formStyle}>
              <DocFormLabel sx={{ marginBottom: "5px" }}>
                Note to your doctor
              </DocFormLabel>
              <JumboInput
                fullWidth
                fieldName="customNote"
                placeholder="Note to your doctor"
                size="small"
                multiline
                rows={5}
              />
            </Box>

            <LoadingButton
              type="submit"
              variant="contained"
              size="medium"
              loading={processing}
              sx={{
                backgroundColor: "#c96ee2",
                marginTop: "25px",
                width: "100%",
              }}
            >
              Request Appointment
            </LoadingButton>
          </JumboForm>
        </Box>
      )}
      <ConfirmationDialog
        isDialogOpened={isSuccess}
        handleCloseDialog={() => {
          eraseCookie("doctorSearchSelContactOpenBooking");
          eraseCookie("doctorSearchSelContact");
          setIsSuccess(false);
          navigate("/askdaysi/my-appointments");
        }}
        icon={<CheckCircleOutlineOutlinedIcon />}
        title="Success"
        description="Request for Booking Successful!"
        iconColor="#3BD2A2"
      >
        <Button
          variant="contained"
          onClick={() => {
            eraseCookie("doctorSearchSelContactOpenBooking");
            eraseCookie("doctorSearchSelContact");
            setIsSuccess(false);
            navigate("/askdaysi/my-appointments");
          }}
        >
          Ok
        </Button>
      </ConfirmationDialog>
      <SignInModal
        mode="patient"
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      <SignUpModal
        mode="patient"
        isDialogOpened={isOpenModal}
        handleCloseDialog={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default PatientBookingForm;
