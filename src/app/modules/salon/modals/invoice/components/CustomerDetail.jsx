import React from "react";
import {
  BACusAvatar,
  BACusName,
  BACusProDetail,
  BACusProDetailWrapper,
  BACusProWapper,
  BAServices,
  BAServicesPrice,
  BAServicesTime,
  BAServicesTitle,
} from "@app/_styles/BookAppointment";
import { Stack } from "@mui/material";
import profilePic from "/assets/images/avatar/avatar10.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
const iconStyles = {
  position: "relative",
  top: "7px",
  fontSize: "22px",
  marginRight: "5px",
};
const CustomerDetail = ({ profile }) => {
  return (
    <BACusProWapper sx={{ borderBottom: "none" }}>
      <Stack>
        <BACusProDetailWrapper>
          <Stack>
            <BACusAvatar src={profile.profile_image} alt="Profile Picture" />
          </Stack>
          <Stack>
            <BACusName variant="h3">{profile.name}</BACusName>
            <BACusProDetail variant="h6">
              <EmailOutlinedIcon sx={iconStyles} />
              {profile.email}
            </BACusProDetail>
            <BACusProDetail variant="h6">
              <SmartphoneOutlinedIcon sx={iconStyles} />
              {profile.phone}
            </BACusProDetail>
            {profile?.address && (
              <BACusProDetail variant="h6">
                <LocationOnOutlinedIcon sx={iconStyles} />
                {profile.address}
              </BACusProDetail>
            )}
          </Stack>
        </BACusProDetailWrapper>
      </Stack>
    </BACusProWapper>
  );
};

export default CustomerDetail;
