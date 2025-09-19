import { useRef, useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { View } from "@app/_components/_core";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { queryDocument, deleteDocument } from "./Documents";

//for new layout

import { BList, BListWrapper, BTitle } from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { QueueCalendar } from "./components/QueueCalendar/QueueCalendar";
import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import QueueBooking from "./components/booking";

export default function QueueList() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [delID, setDelID] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [refresh, setRefresh] = useState(1);
  const { t } = useTranslation();
  const searchElement = useRef();
  const navigate = useNavigate();

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
        queryKey: ["queue"],
        refetchType: "all",
      });
      navigate("/salon/queue");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["queue", { gql: queryDocument(searchTerm, currentPage) }],
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
      {/* // */}

      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <CalendarWrapper>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Stack>
                <Typography variant="h3">{t("Booking Queue")}</Typography>
              </Stack>
              <Stack>
                <Box sx={{ display: "flex", gap: "15px" }}>
                  <Link to={`/salon/queue/new`}>
                    <Button
                      variant={"contained"}
                      size={"small"}
                      color={"primary"}
                    >
                      Add New
                    </Button>
                  </Link>
                  {/* <AdminBooking refreshFx={refreshFx} />
                  <Link to="/salon/queue">
                    <Button variant="outlined" size="small">
                      Manage Waiting List
                    </Button>
                  </Link> */}
                </Box>
              </Stack>
            </Box>
            <QueueCalendar refreshV={refresh} />
          </CalendarWrapper>
        </Grid>
      </Grid>
      {/* /// */}

      {isDeleting && (
        <TFConfirmModal
          isError={isErrorDeleting}
          error={deleteError}
          isPending={isPendingDeletion}
          handleStop={handleStopDelete}
          handle={handleDelete}
        />
      )}
      {/*
      <BListWrapper>
        <header>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              maxWidth: "100%",
              justifyContent: "space-between",
              gap: "20px",
              padding: "20px",
            }}
          >
            <Stack>
              <Typography variant={"h2"} mb={3}>
                {t("Booking Queue")}
              </Typography>
              <form onSubmit={handleSubmit} id="search-form">
                <TextField
                  size="small"
                  inputRef={searchElement}
                  placeholder="Search Queue"
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
              <Link to={`/salon/queue/new`}>
                <Button variant={"contained"} size={"medium"} color={"primary"}>
                  Add New
                </Button>
              </Link>
            </Stack>
          </Box>
        </header>

        {data && data.rows.length > 0 && (
          <View variant="list" dataSource={data.rows} renderItem={ListItem} />
        )}
      </BListWrapper> */}
      {data && data.rows.length > 0 && (
        <AppPagination
          current_page={currentPage}
          current_rowsPerPage={PER_PAGE}
          totalRows={data["totalCount"]}
          onHandleChangePage={handlePage}
        />
      )}
    </Container>
  );
}

export function ListItem({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <BList>
        <Stack>
          <BTitle variant="h5">
            {item.customer.first_name} {item.customer.last_name}
            <br />
            {item.customer.email}
            <br />
            {item.customer.phone}
          </BTitle>
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
                navigate(`/salon/queue/${item.id}`);
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
