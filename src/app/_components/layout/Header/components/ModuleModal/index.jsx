import React, { lazy, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Badge, Box, Button, ButtonGroup, Icon, Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { Span } from "@jumbo/shared";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import {
  CircularProgressLoader,
  ModuleCardContainer,
  ModuleCardTitle,
} from "@app/_styles/ModuleModal";
import { Colors } from "@app/_themes/TileFlex";
import { BouncingDotsLoader } from "@app/_components/apps/common_components";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { useQuery, useMutation } from "react-query";
import { gql } from "graphql-request";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { TFA_ICONS } from "@app/_utilities/constants/tfa-icons";

const addBookmark = (tag = "") => gql`addBookmark("${tag}")`;

const removeBookmark = (tag = "") => gql`removeBookmark"${tag}"`;

var listDataSample = [
  {
    id: 1,
    icon: "AttachMoneyOutlinedIcon",
    title: "Sales Overview",
  },
  {
    id: 2,
    icon: "BorderColorOutlinedIcon",
    title: "Orders",
  },
  {
    id: 3,
    icon: "FilterAltOutlinedIcon",
    title: "Leads",
  },
  {
    id: 4,
    icon: "PersonOutlineOutlinedIcon",
    title: "Daily Visitors",
  },
  {
    id: 5,
    icon: "EmailOutlinedIcon",
    title: "Messages",
  },
  {
    id: 6,
    icon: "NotificationsActiveOutlinedIcon",
    title: "Notifications",
  },
  {
    id: 7,
    icon: "SettingsOutlinedIcon",
    title: "Settings",
  },
  {
    id: 8,
    icon: "AutoGraphOutlinedIcon",
    title: "Revenue",
  },
  {
    id: 9,
    icon: "PeopleOutlinedIcon",
    title: "Contacts",
  },
];

const ModuleModal = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;

  const [open, setOpen] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const [listData, setListData] = React.useState(listDataSample);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBookmark = useCallback(() => {
    setIsAdding(true);
    mutate({
      path: `/graphql`,
      inData: { gql: addBookmark(pathname) },
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 3000);
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {},
  });

  const handleRemoveBookmark = useCallback((id) => {
    setListData(
      listData.filter((item) => {
        if (item.id != id) {
          return item;
        }
      })
    );

    mutate({
      path: `/graphql`,
      inData: { gql: removeBookmark(id) },
    });
  });

  return (
    <React.Fragment>
      <ButtonGroup>
        <JumboIconButton elevation={1} onClick={handleClickOpen}>
          <Badge color="primary">
            <DashboardCustomizeOutlinedIcon sx={{ fontSize: "1.5rem" }} />
          </Badge>
        </JumboIconButton>
        <JumboIconButton elevation={1} onClick={handleAddBookmark}>
          <Badge color="primary">
            {!isAdding && <BookmarkAddOutlinedIcon />}
            {isAdding && <CircularProgressLoader size="25px" />}
          </Badge>
        </JumboIconButton>
      </ButtonGroup>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="100%"
        fullWidth={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "18px" }}
          id="customized-dialog-title"
        >
          Browse Modules
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={4}>
            {listData.map((item, index) => (
              <ModuleItem
                item={item}
                key={index}
                removeBookmark={handleRemoveBookmark}
              />
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export function ModuleItem({ item, removeBookmark }) {
  const Component = TFA_ICONS[item.icon];
  return (
    <Grid item xs={12} md={2}>
      <ModuleCardContainer>
        <JumboIconButton
          elevation={1}
          onClick={() => removeBookmark(item.id)}
          sx={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            height: "22px",
            width: "22px",
            border: `1px solid ${Colors.light_red}`,
          }}
        >
          <Badge color="primary">
            <Span sx={{ color: Colors.light_red }}>
              <CloseIcon sx={{ fontSize: "16px" }} />
            </Span>
          </Badge>
        </JumboIconButton>
        <Component sx={{ fontSize: "40px", color: Colors.light_blue }} />
        <ModuleCardTitle variant="h3">{item.title}</ModuleCardTitle>
      </ModuleCardContainer>
    </Grid>
  );
}

export default ModuleModal;
