import { useRef, useState, useEffect } from "react";
import { AppPagination } from "@app/_components/_core";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { LoadingIndicator, TFItem } from "@app/_shared/GeneralUI.jsx";
import Modal, { TFConfirmModal } from "@app/_shared/Modal.jsx";
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

//for new layout

import {
  BList,
  BListWrapper,
  BTHeaderWrapper,
  BTitle,
} from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { JumboCard } from "@jumbo/components";
import { getRoles } from "@app/_utilities/helpers";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

export default function NotificationList() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState({});
  const [delID, setDelID] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const { userDetail } = useAuth();

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
        queryKey: ["notification"],
        refetchType: "all",
      });
      navigate("/askdaysi/notifications");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notification", { gql: queryDocument(searchTerm, currentPage) }],
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

  function handleStartView(item) {
    var booking_id;
    try {
      if (item.dataX.includes("booking_id")) {
        booking_id = item.dataX.split("=");
        booking_id = booking_id[1];
      }
    } catch (e) {}

    if (booking_id !== undefined) {
      var roles = getRoles(userDetail.organizations);
      if (roles.includes("patient")) {
        navigate("/askdaysi/my-appointments?bid=" + booking_id);
      }
      if (roles.includes("doctor")) {
        navigate("/askdaysi/appointment-request?bid=" + booking_id);
      }
    } else {
      setIsViewing(true);
      setItem((p) => item);
    }
  }

  function handleStopViewing() {
    setIsViewing(false);
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
      item["onStartView"] = (item) => handleStartView(item);

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

        {isViewing && (
          <TFViewModal item={item} handleStop={handleStopViewing} />
        )}

        <Typography variant={"h3"}>{t("Notifications")}</Typography>
        <BListWrapper>
          <header>
            <BTHeaderWrapper>
              <Stack>
                <form onSubmit={handleSubmit} id="search-form">
                  <TextField
                    size="small"
                    inputRef={searchElement}
                    placeholder="Search Notifications"
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
            </BTHeaderWrapper>
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
      </JumboCard>
    </Container>
  );
}

export function ListItem({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <BList>
        <Stack>
          <BTitle variant="h5"> {item.content}</BTitle>
        </Stack>
        <Stack>
          <ButtonGroup>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={"success"}
              onClick={() => item.onStartView(item)}
            >
              View
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

export function TFViewModal({ handleStop, item }) {
  console.log("viewing..", item);
  return (
    <Modal onClose={handleStop}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {item.content}
        <div className="form-actions">
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={handleStop}
              className="button-text"
              variant="contained"
              size="medium"
              color="error"
            >
              Done
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
}
