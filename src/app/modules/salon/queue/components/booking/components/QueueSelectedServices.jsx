import {
  BABtn,
  BACloseIcon,
  BACusDetail,
  BAProvider,
  BAProviderImg,
  BAServiceCardTime,
  BAServiceCardTitle,
  BAServices,
  BAServicesPrice,
  BAServicesTime,
  BAServicesTitle,
  BAServiceTitle,
  BASWrapper,
  BATotalText,
  BATotalWrapper,
  BAUserDetailWrapper,
  BAUserSearch,
  BAUserTitle,
  BAUserTitleWrapper,
} from "@app/_styles/BookAppointment";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import BAImage from "/assets/images/cover_pic.png";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
//dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";

//tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { JumboCard } from "@jumbo/components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AppPagination } from "@app/_components/_core";
import * as Yup from "yup";
import {
  queryDocument,
  deleteDocument,
} from "@app/modules/salon/customers/Documents";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const tabStyles = {
  "& .MuiButtonBase-root": {
    textTransform: "capitalize",
    fontSize: "16px",
  },
};

const dialogStyle = {
  "& .MuiPaper-root": {
    overflowY: "visible",
  },
};

const listStyle = {
  "& .MuiTypography-root": {
    fontSize: "15px",
  },
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
});

var selectedCustomer = {};

const QueueSelectedServices = ({
  steps,
  nxtFxn,
  closeFxn,
  organization,
  selectedServices,
  removeService,
  setBookingDetail,
  queue,
}) => {
  const [refresh, setRefresh] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  var total = 0;
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchElement = React.useRef();

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closeFxn();
  };

  useEffect(() => {
    setBookingDetail("services", selectedServices);
  });

  //tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchCustomer = React.useCallback((event) => {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  });

  const bookNewCustomer = React.useCallback((customer) => {
    customer.isNew = true;
    setBookingDetail("customer", customer);
    handleClose();
  });

  const bookExistingCustomer = React.useCallback(() => {
    // var customer = {};
    // customer.isNew = false;
    // customer.customer_id = 75;
    setBookingDetail("customer", {}, true);
    handleClose();
  });

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const selectExistingCustomer = React.useCallback((c) => {
    selectedCustomer = c;
    setRefresh(refresh + 1);
  });

  const {
    data: existingUsers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking_customer", { gql: queryDocument(searchTerm, 0) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  //console.log("queue xx", queue);

  return (
    <BASWrapper>
      <BAProvider sx={{ gap: "15px" }}>
        <Stack>
          <BAProviderImg
            src={
              queue?.customer?.profilePic
                ? queue?.customer?.profilePic
                : organization?.image_url
            }
            alt="Business Image"
            sx={{ width: "100px" }}
          />
        </Stack>
        <Stack>
          <BAServiceCardTitle variant="h3">
            {queue?.customer?.firstName} {queue?.customer?.lastName}
          </BAServiceCardTitle>
          <List sx={{ paddingTop: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <EmailOutlinedIcon
                  sx={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={queue?.customer?.email ? queue?.customer?.email : "-"}
                sx={listStyle}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <PhoneIphoneOutlinedIcon
                  sx={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={queue?.customer?.phone ? queue?.customer?.phone : "-"}
                sx={listStyle}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <EditNoteOutlinedIcon
                  sx={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={queue?.note} sx={listStyle} />
            </ListItem>
          </List>
        </Stack>
      </BAProvider>
      {selectedServices.length <= 0 ? (
        <Box>
          <BAServiceCardTime>No Services Selected</BAServiceCardTime>
        </Box>
      ) : (
        selectedServices.map((data, index) => {
          total += Number(data.price);
          return (
            <BAServices>
              <Stack sx={{ flex: 7 }}>
                <BAServicesTitle variant="h3">{data.title}</BAServicesTitle>
                <BAServicesTime>{data.time}</BAServicesTime>
              </Stack>
              <Stack sx={{ flex: 4 }}>
                <BAServicesPrice>{data.price_display}</BAServicesPrice>
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <RemoveCircleOutlineOutlinedIcon
                  color="error"
                  onClick={() => removeService(data.id)}
                  sx={{ cursor: "pointer" }}
                />
              </Stack>
            </BAServices>
          );
        })
      )}

      <BATotalWrapper>
        <Stack>
          <BATotalText>Total</BATotalText>
        </Stack>
        <Stack>
          <BATotalText>USD {total}</BATotalText>
        </Stack>
      </BATotalWrapper>

      {steps <= 1 ? (
        selectedServices.length > 0 && (
          <BABtn variant="contained" color="primary" onClick={nxtFxn}>
            Continue
          </BABtn>
        )
      ) : (
        <BABtn
          variant="contained"
          color="primary"
          onClick={bookExistingCustomer}
        >
          Book Now
        </BABtn>
      )}
    </BASWrapper>
  );
};

export default QueueSelectedServices;
