import { useRef, useState, useEffect } from "react";
import { AppPagination } from "@app/_components/_core";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { LoadingIndicator, TFItem } from "@app/_shared/GeneralUI.jsx";
import { TFConfirmModal } from "@app/_shared/Modal.jsx";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Container,
  Typography,
  Avatar,
  Badge,
  Card,
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  ButtonGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { View } from "@app/_components/_core";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { queryDocument, deleteDocument } from "./Documents";

const ContactList = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [delID, setDelID] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);

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
        queryKey: ["contact"],
        refetchType: "all",
      });
      navigate("/contact");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contact", { gql: queryDocument(searchTerm, currentPage) }],
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
      {isDeleting && (
        <TFConfirmModal
          isError={isErrorDeleting}
          error={deleteError}
          isPending={isPendingDeletion}
          handleStop={handleStopDelete}
          handle={handleDelete}
        />
      )}

      <Typography variant={"h2"} mb={3}>
        {t("Manage Contacts")}
      </Typography>

      <header>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            maxWidth: "100%",
            justifyContent: "space-between",
            marginBottom: "40px",
            gap: "20px",
          }}
        >
          <Stack>
            <Link to={`/contact/new`}>
              <Button variant={"contained"} size={"medium"} color={"primary"}>
                Add New
              </Button>
            </Link>
          </Stack>
          <Stack>
            <form onSubmit={handleSubmit} id="search-form">
              <TextField
                variant="outlined"
                size="small"
                inputRef={searchElement}
                placeholder="Search Contacts"
              />{" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
              >
                Search
              </Button>
            </form>
          </Stack>
        </Box>
      </header>

      {data && data.rows.length > 0 && (
        <View
          variant="list"
          dataSource={data.rows}
          renderItem={ContactListItem}
        />
      )}

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
};

export function ContactListItem({ item }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ mb: 1 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ p: (theme) => theme.spacing(2, 1) }}
      >
        <TFItem
          sx={{
            flex: { xs: 1, md: "0 1 45%", lg: "0 1 35%" },
          }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <TFItem>
              <Badge
                overlap="circular"
                variant="dot"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{
                  ".MuiBadge-badge": {
                    border: "2px solid #FFF",
                    height: "14px",
                    width: "14px",
                    borderRadius: "50%",
                    bgcolor: item.isOnline ? "success.main" : "#757575",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                  }}
                  alt={`${item.firstName}
                                    ${item.lastName}`}
                  src={item.profilePic}
                />
              </Badge>
            </TFItem>
            <TFItem>
              <Typography
                variant={"h6"}
                mb={0.5}
              >{`${item.firstName} ${item.lastName}`}</Typography>
              <Typography variant={"body1"} color="text.secondary">
                {item.handle}
              </Typography>
            </TFItem>
          </Stack>
        </TFItem>
      </Stack>
    </Card>
  );
}

export default ContactList;
