import React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import { AppPagination } from "@app/_components/_core";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { LoadingIndicator, TFItem } from "@app/_shared/GeneralUI.jsx";
import { TFConfirmModal } from "@app/_shared/Modal.jsx";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { View } from "@app/_components/_core";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { queryDocument, deleteDocument } from "./Documents";
import { Div, Span } from "@jumbo/shared";
import {
  BList,
  BListWrapper,
  BTHeaderWrapper,
  BTitle,
} from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CustomerWidget from "../modals/CustomerWidget";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import { JumboCard } from "@jumbo/components";

var customerId = -1;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function CustomerList() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [delID, setDelID] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);

  const { t } = useTranslation();
  const searchElement = useRef();
  const navigate = useNavigate();

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback((id) => {
    customerId = id;
    setOpen(true);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const dialogStyles = {
    "& .MuiDialog-container": {
      width: "50%",
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

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      setIsDeleting(false);
      queryClient.invalidateQueries({
        queryKey: ["customer"],
        refetchType: "all",
      });
      navigate("/salon/customer");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customer", { gql: queryDocument(searchTerm, currentPage) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  function handleDelete() {
    if (delID != -1)
      mutate({
        path: `/graphql`,
        inData: { gql: deleteDocument(delID) },
      });
  }

  function handleStartDelete(del_id) {
    setIsDeleting(true);
    setDelID(del_id);
  }

  function handleStopDelete() {
    setIsDeleting(false);
    setDelID(-1);
  }

  function handlePage(newPage) {
    setCurrentPage(newPage);
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
      item["onStartDelete"] = (idx) => handleStartDelete(idx);
      item["handleClickOpen"] = (idx) => handleClickOpen(idx);
      return item;
    });
  }

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
        {isDeleting && (
          <TFConfirmModal
            isError={isErrorDeleting}
            error={deleteError}
            isPending={isPendingDeletion}
            handleStop={handleStopDelete}
            handle={handleDelete}
          />
        )}

        <Typography variant={"h3"}>{t("Customers")}</Typography>
        <BListWrapper>
          <header>
            <BTHeaderWrapper>
              <Stack>
                <form onSubmit={handleSubmit} id="search-form">
                  <TextField
                    size="small"
                    inputRef={searchElement}
                    placeholder="Search Customers"
                    InputProps={{
                      endAdornment: (
                        <IconButton type="submit">
                          <SearchOutlinedIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </form>
              </Stack>
              <Stack>
                <Link to={`/salon/customer/new`}>
                  <Button
                    variant={"contained"}
                    size={"small"}
                    color={"primary"}
                  >
                    Add New
                  </Button>
                </Link>
              </Stack>
            </BTHeaderWrapper>{" "}
          </header>

          {data && data.rows.length > 0 && (
            <View variant="list" dataSource={data.rows} renderItem={ListItem} />
          )}
        </BListWrapper>
        {data && data.rows.length > 0 && (
          <AppPagination
            current_page={currentPage}
            current_rowsPerPage={PER_PAGE}
            totalRows={data["totalCount"]}
            onHandleChangePage={handlePage}
          />
        )}

        <Dialog
          fullScreen
          open={open}
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
              // inset: "5px 0 0 15px",
              left: "15px",
              top: "5px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <CustomerWidget customerId={customerId} />
        </Dialog>
      </JumboCard>
    </Container>
  );
}

export function ListItem({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <BList>
        <Stack sx={{ flex: 1 }}>
          <BTitle variant="h5">
            {item.firstName} {item.lastName}
          </BTitle>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <Span variant="h6">{item.email}</Span>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <Span variant="h6">{item.phone}</Span>
        </Stack>
        <Stack>
          <ButtonGroup>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={item.isFollowing ? "error" : "primary"}
              onClick={() => {
                item.handleClickOpen(item.id);
              }}
            >
              View
            </Button>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={item.isFollowing ? "error" : "warning"}
              onClick={() => {
                navigate(`/salon/customer/${item.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={item.isFollowing ? "error" : "error"}
              onClick={() => item.onStartDelete(item.id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Stack>
      </BList>
    </>
  );
}
