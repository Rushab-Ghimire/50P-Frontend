import React, { useRef, useState, useEffect } from "react";
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
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { View } from "@app/_components/_core";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { queryDocument, deleteDocument } from "./Documents";
import {
  BList,
  BListWrapper,
  BTHeaderWrapper,
  BTitle,
} from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import InvoiceDetail from "../modals/invoice";
import { JumboCard } from "@jumbo/components";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function SalesList() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderID, setOrderID] = useState(-1);
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
        queryKey: ["sales"],
        refetchType: "all",
      });
      navigate("/salon/sales");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales", { gql: queryDocument(searchTerm, currentPage) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
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
      item["handleClickOpen"] = (idx) => handleClickOpen(idx);
      return item;
    });
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (order_id) => {
    setOrderID((orev) => order_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const dialogStyles = {
    "& .MuiDialog-container": {
      width: "60%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
    },
  };

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
        <Typography variant={"h3"}>{t("Sales")}</Typography>
        <BListWrapper>
          <header>
            <BTHeaderWrapper>
              <Stack>
                <form onSubmit={handleSubmit} id="search-form">
                  <TextField
                    size="small"
                    inputRef={searchElement}
                    placeholder="Search Sales"
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
                left: "15px",
                top: "5px",
              }}
            >
              <CloseIcon />
            </IconButton>
            {orderID != -1 && <InvoiceDetail order_id={orderID} />}
          </Dialog>
        </Box>
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
            <Typography variant="span" fontWeight={"600"}>
              Order No:
            </Typography>{" "}
            {item.orderCode}
          </BTitle>
        </Stack>
        <Stack sx={{ flex: 2 }}>
          <BTitle variant="h5">
            {item.customer.firstName} {item.customer.lastName}
          </BTitle>
        </Stack>
        <Stack sx={{ flex: 2 }}>
          <BTitle variant="h5">{item.customer.email}</BTitle>
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
          </ButtonGroup>
        </Stack>
      </BList>
    </>
  );
}
