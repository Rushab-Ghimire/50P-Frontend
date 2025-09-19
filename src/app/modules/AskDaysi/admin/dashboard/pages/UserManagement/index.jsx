import { useRef, useState, useEffect } from "react";
import { AppPagination } from "@app/_components/_core";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

//for new layout

import {
  BList,
  BListWrapper,
  BTHeaderWrapper,
  BTitle,
} from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { JumboCard } from "@jumbo/components";
import MyAppointmentsDialog from "../../dialogs/MyAppointments";
import { getFormattedDate } from "@app/_utilities/helpers";
import UserDetailDialog from "./UserDetailDialog";

export default function UserManagement() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [delID, setDelID] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemX, setItemX] = useState();

  const { t } = useTranslation();
  const searchElement = useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

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
        queryKey: ["user-accounts"],
        refetchType: "all",
      });
      navigate("/askdaysi/users");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "user-accounts",
      { gql: queryDocument(searchTerm, currentPage) },
    ],
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

  function handleStartEdit(item) {
    setItemX((p) => item);
    setIsOpen(true);
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
      item["onStartEdit"] = (item) => handleStartEdit(item);

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

        <Typography variant={"h3"}>All User Accounts</Typography>
        <UserDetailDialog
          isDialogOpened={isOpen}
          data={itemX}
          handleCloseDialog={() => setIsOpen(false)}
        />
        <BListWrapper>
          <header>
            <BTHeaderWrapper>
              <Stack>
                <form onSubmit={handleSubmit} id="search-form">
                  <TextField
                    size="small"
                    inputRef={searchElement}
                    placeholder="Search Users"
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
        <Stack sx={{ width: { xs: "100%", sm: "auto", md: "33%" } }}>
          <BTitle variant="h5">
            {item.firstName} {item.lastName}
            <br />
            {item.email}
          </BTitle>
        </Stack>

        <Stack>
          <ButtonGroup>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={"success"}
              onClick={() => item.onStartEdit(item)}
            >
              View Detail
            </Button>
          </ButtonGroup>
        </Stack>
      </BList>
    </>
  );
}
