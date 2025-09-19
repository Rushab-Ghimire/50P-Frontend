import React, { useEffect, useState } from "react";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import { t } from "i18next";
import { useMutation } from "react-query";
import { gqlMutate, queryClient } from "@app/_utilities/http";
import { gql } from "graphql-request";

export const generateReferralCode = () => {
  return gql`
    mutation Mutation {
      referralCodeCreate {
        referralCode {
          code
          id
        }
      }
    }
  `;
};

var REF_URL = `${window.location.origin}?mode=signup`;
const ReferFriendCode = ({ ref_code }) => {
  const [refresh, setRefresh] = useState(0);
  const [codeLoaded, setCodeLoaded] = useState(false);
  const [code, setCode] = useState(ref_code);
  const [url, setUrl] = useState("");
  const [inputValue, setInputValue] = useState(url);

  const handleCopy = () => {
    if (inputValue) {
      navigator.clipboard
        .writeText(inputValue)
        .then(() => {
          sweetAlerts("success", "Referal link copied!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const handleCopyCode = () => {
    if (inputValue) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          sweetAlerts("success", "Referal code copied!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const sweetAlerts = (variant, msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: variant,
      title: msg,
      background: theme.palette.background.paper,
    });
  };

  const textFieldStyles = {
    "& .MuiInputBase-root": {
      borderRadius: "4px 0 0 4px",
    },
  };

  useEffect(() => {
    if (code !== undefined) {
      setCodeLoaded(true);
      setInputValue((u) => `${REF_URL}&ref=${code}`);
      return;
    }

    if (!codeLoaded) {
      setInputValue((p) => "Generating Referral URL...Please Wait");
      mutate({
        inData: { gql: generateReferralCode() },
        path: `/graphql`,
        onSuccess: (data) => {
          var cde = data.referralCodeCreate.referralCode.code;
          setCode(cde);
          setUrl((a) => `${REF_URL}&ref=${cde}`);
          setInputValue((u) => `${REF_URL}&ref=${cde}`);
          setRefresh(refresh + 1);
        },
      });
      setCodeLoaded(true);
    }
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["referral_code"] });
    },
  });

  return (
    <>
      <Typography variant="h4">
        Send this code to your friend or loved ones
      </Typography>
      <Box
        sx={{
          display: "flex",
          mt: 0,
          mb: 4,
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            gap: 2,
          },
        }}
      >
        <TextField
          disabled={true}
          variant="outlined"
          value={inputValue}
          size="small"
          sx={textFieldStyles}
        />
        {code !== undefined && (
          <Button
            startIcon={<ContentCopyOutlinedIcon />}
            variant="contained"
            color="primary"
            onClick={handleCopy}
            sx={{
              mr: 1,
              borderRadius: "0 4px 4px 0",
              backgroundColor: Colors.primary,
              "&:hover": {
                backgroundColor: Colors.primary,
              },
              [theme.breakpoints.down("sm")]: {
                borderRadius: "4px",
                width: "100%",
              },
            }}
          >
            Link
          </Button>
        )}
        {code !== undefined && (
          <Button
            startIcon={<ContentCopyOutlinedIcon />}
            variant="contained"
            color="primary"
            onClick={handleCopyCode}
            sx={{
              backgroundColor: Colors.primary,
              "&:hover": {
                backgroundColor: Colors.primary,
              },
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            Code
          </Button>
        )}
      </Box>
    </>
  );
};

export default ReferFriendCode;
