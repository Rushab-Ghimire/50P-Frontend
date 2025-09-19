import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { Box, Typography, useTheme } from "@mui/material";
import avatar from "/assets/images/avatar/jeson-born.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

// var details = [
//   { label: "Name", value: "John Doe" },
//   { label: "E-Mail", value: "johndoe@example.com" },
//   { label: "Phone", value: "+1-555-1234" },
//   { label: "Langugaes", value: "English, Spanish" },
//   { label: "Address", value: "123 Elm St Springfield" },
// ];

const UserDetailDialog = ({ isDialogOpened, handleCloseDialog, data }) => {
  //console.log("data", data);

  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (data === undefined) return;
    var details = [
      { label: "Name", value: data.firstName + " " + data.lastName },
      { label: "E-Mail", value: data.email },
      { label: "Phone", value: data.phone ? data.phone : "-" },
      { label: "Role", value: data.role == null ? "-" : data.role },
      // { label: "Address", value: "-" },
    ];
    setDetails((p) => details);
  }, [data]);

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const theme = useTheme();
  const dialogStyles = {
    "& .MuiDialog-container": {
      width: "30%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "75%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };

  return (
    <Dialog
      fullScreen
      open={isDialogOpened}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={dialogStyles}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{
          position: "absolute",
          right: "20px",
          top: "20px",
          border: `1px solid ${Colors.black}`,
          padding: "3px",
          color: Colors.black,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ p: 4 }}>
        <img
          src={data?.profilePic}
          alt=""
          style={{
            borderRadius: "5px",
            height: "150px",
            width: "150px",
            marginBottom: "12px",
          }}
        />
        {details.map((data, index) => (
          <React.Fragment key={index}>
            <Typography variant="h3" key={index}>
              <Typography variant="span" fontWeight={"500"} sx={{ mr: 1 }}>
                {data.label}:
              </Typography>
              {data.value}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    </Dialog>
  );
};

export default UserDetailDialog;
