import React, { useRef, useState, useEffect, useCallback } from "react";
import { AppPagination } from "@app/_components/_core";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  queryClient,
  gqlQuery,
  gqlMutate,
  sweetAlerts,
} from "@app/_utilities/http.js";
import { LoadingIndicator, TFItem } from "@app/_shared/GeneralUI.jsx";
import { TFConfirmModal } from "@app/_shared/Modal.jsx";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import {
  Container,
  Typography,
  Card,
  Stack,
  Button,
  Box,
  TextField,
  ButtonGroup,
  IconButton,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { View } from "@app/_components/_core";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { queryDocument, updateDocument } from "./Documents";
import { BList, BListWrapper, BTitle } from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SetField, SetLabel, SetRows } from "@app/_styles/settings";
import * as Yup from "yup";
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { JumboCard } from "@jumbo/components";
import PhoneInput from "react-phone-input-2";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

const validationSchema = Yup.object().shape({
  //title: Yup.string().required("title is required"),
});

var SettingParams = {
  General: [
    { key: "site_name", label: "Site Name", type: "text" },
    { key: "business_email", label: "Business Email", type: "text" },
    { key: "business_phone", label: "Business Phone", type: "phone" },
    { key: "public_url", label: "Public URL", type: "text" },
    { key: "logo", label: "Logo", type: "image" },
  ],
  Payment: [
    { key: "tax_1", label: "SGST Tax", type: "text" },
    { key: "tax_2", label: "CGST Tax", type: "text" },
  ],
  Notification: [{ key: "sender_email", label: "Sender Email", type: "text" }],
  all_: [],
};

const labelStyle = {
  width: "115px",
};

const phoneInput = {
  width: "100%",
  "& .special-label": {
    display: "none !important",
  },
};
var formData = {};
export default function SettingsList() {
  const { t } = useTranslation();
  const searchElement = useRef();
  const navigate = useNavigate();
  const { logout, userDetail } = useAuth();
  const imageRef = useRef();

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const [phone, setPhone] = React.useState("");

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
        refetchType: "all",
      });
      sweetAlerts("success", "Settings Updated", Swal, theme);
    },
  });

  const getKeyList = useCallback(() => {
    let KL = SettingParams["General"].map((item) => `"${item.key}"`);
    KL = KL.concat(SettingParams["Payment"].map((item) => `"${item.key}"`));
    KL = KL.concat(
      SettingParams["Notification"].map((item) => `"${item.key}"`)
    );

    return KL;
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["settings", { gql: queryDocument(getKeyList(), 0) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
    onSuccess: () => {
      if (imageRef.current) {
        imageRef.current.reload();
      }
    },
  });

  function handleSubmit(d) {
    formData = d;
    if (imageRef.current) {
      imageRef.current.doUpload(submitFormData);
    } else {
      submitFormData();
    }
  }

  function submitFormData(files_data) {
    //console.log("submitting all", formData, files_data);
    if (files_data?._name !== undefined && files_data?._value != "") {
      formData[files_data._name] = files_data._value;
    }
    //console.log("submitting with fdata", formData, files_data);
    //return;

    mutate({
      inData: { gql: updateDocument(formData) },
      path: "/graphql",
    });
  }

  let content = "";

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch items."}
      />
    );
  }

  if (data && data.rows.length > 0) {
    data.rows.map((item) => {
      SettingParams["all_"][item.key] = item.value;
    });
  }

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <JumboCard contentWrapper>
        <Typography variant={"h3"} mb={3}>
          {t("Settings")}
        </Typography>
        <BListWrapper>
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="General" value="1" />
                    <Tab label="Payment" value="2" />
                    <Tab label="Alerts & Notifications" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {SettingParams["General"].map((item) => (
                    <SetRows key={item.key}>
                      <Stack sx={labelStyle}>
                        <SetLabel>{item.label}:</SetLabel>
                      </Stack>
                      {item.type == "text" && (
                        <JumboInput
                          fullWidth
                          variant="outlined"
                          size="small"
                          defaultValue={SettingParams["all_"][item.key]}
                          fieldName={item.key}
                        />
                      )}
                      {item.type == "image" && (
                        <SingleFileUploader
                          field_name={item.key}
                          file_key={"Logo"}
                          unique_id={SettingParams["all_"][item.key]}
                          owner_type="organization"
                          ref={imageRef}
                        />
                      )}
                      {item.type == "phone" && (
                        <Box sx={phoneInput}>
                          <PhoneInput
                            size="small"
                            international={true}
                            withCountryCallingCode={true}
                            country={"us"}
                            value={SettingParams["all_"][item.key]}
                            onChange={(phoneN) => {
                              setPhone("+" + phoneN);
                            }}
                          />
                          <JumboInput
                            className={"hideInput"}
                            fieldName={item.key}
                            defaultValue={
                              phone == ""
                                ? SettingParams["all_"][item.key]
                                : phone
                            }
                            value={
                              phone == ""
                                ? SettingParams["all_"][item.key]
                                : phone
                            }
                          ></JumboInput>
                        </Box>
                      )}
                    </SetRows>
                  ))}
                </TabPanel>
                <TabPanel value="2">
                  {SettingParams["Payment"].map((item) => (
                    <SetRows key={item.key}>
                      <Stack>
                        <SetLabel>{item.label}:</SetLabel>
                      </Stack>
                      <JumboInput
                        fullWidth
                        variant="outlined"
                        size="small"
                        defaultValue={SettingParams["all_"][item.key]}
                        fieldName={item.key}
                      />
                    </SetRows>
                  ))}
                </TabPanel>
                <TabPanel value="3">
                  {SettingParams["Notification"].map((item) => (
                    <SetRows>
                      <Stack>
                        <SetLabel>{item.label}:</SetLabel>
                      </Stack>
                      <JumboInput
                        fullWidth
                        variant="outlined"
                        size="small"
                        defaultValue={SettingParams["all_"][item.key]}
                        fieldName={item.key}
                      />
                    </SetRows>
                  ))}
                </TabPanel>
              </TabContext>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "20px",
                }}
              >
                <Button type="submit" variant="contained" size="small">
                  Save Settings
                </Button>
              </Box>
            </Box>
          </JumboForm>
        </BListWrapper>
      </JumboCard>
    </Container>
  );
}
