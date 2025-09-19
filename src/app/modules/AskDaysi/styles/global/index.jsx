import { styled } from "@mui/material";
import PhoneInput from "react-phone-input-2";

export const ADLogo = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "95px",
}));

export const ADPhoneInput = styled(PhoneInput)(() => ({
  "& input.form-control": {
    padding: "16.5px 14px 16.5px 50px !important",
  },
}));
