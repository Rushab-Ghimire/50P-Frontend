import React, { useCallback, useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import profilePic from "/assets/images/avatar/avatar10.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { CWAvatar, CWDetail, CWName } from "@app/_styles/CustomerWidgets";
import { createDocument } from "@app/modules/salon/invitation/Documents";
import { useMutation } from "react-query";
import { gqlMutate, queryClient } from "@app/_utilities/http";
import LoadingButton from "@mui/lab/LoadingButton";

const iconStyles = {
  position: "relative",
  top: "5px",
  fontSize: "22px",
  marginRight: "5px",
};
const StaffProfileWidget = ({ profile }) => {
  const [isInviting, setIsInviting] = useState(false);
  const inviteUser = useCallback(() => {
    mutate({
      inData: {
        gql: createDocument({ to_user: profile.user_id, email: profile.email }),
      },
      path: "/graphql",
      onSuccess: (d) => {
        setIsInviting(false);
      },
    });
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["invite_user"] });
    },
  });

  return (
    <>
      <Box>
        <Stack>
          <CWAvatar src={profile?.profile_image} alt="Profile Picture" />
          <CWName variant="h3">{profile?.full_name}</CWName>
          <CWDetail variant="h4">
            <EmailOutlinedIcon sx={iconStyles} />
            {profile?.email}
          </CWDetail>
          <CWDetail variant="h4">
            <SmartphoneOutlinedIcon sx={iconStyles} />
            {profile?.phone}
          </CWDetail>
          {profile?.address && <CWDetail variant="h4">
            <LocationOnOutlinedIcon sx={iconStyles} />
            {profile?.address}
          </CWDetail>}
          <LoadingButton
            fullWidth
            type="button"
            onClick={() => {
              setIsInviting(true);
              inviteUser();
            }}
            variant="contained"
            size="large"
            loading={isInviting}
          >
            Invite to Join
          </LoadingButton>
        </Stack>
      </Box>
      <Divider sx={{ margin: "16px 0" }} />
    </>
  );
};

export default StaffProfileWidget;
