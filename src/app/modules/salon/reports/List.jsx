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
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { View } from "@app/_components/_core";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { queryDocument, deleteDocument } from "./Documents";
import { BList, BListWrapper, BTitle } from "@app/_styles/business";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";

export const reportList = [
  {
    id: 1,
    title: "Revenue <br/>Reports",
    icon: <AttachMoneyOutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/graph-reports",
  },
  {
    id: 2,
    title: "Services in High Demand Reports",
    icon: <TrendingUpOutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/pivot-table",
  },
  {
    id: 3,
    title: "Best Clients <br/>Reports",
    icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/graph-reports",
  },
  {
    id: 4,
    title: "Staff <br/>Reports",
    icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/graph-reports",
  },
  {
    id: 5,
    title: "Stock <br/>Reports",
    icon: <Inventory2OutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/graph-reports",
  },
  {
    id: 6,
    title: "Productivity & Appointments Reports ",
    icon: <EventAvailableOutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/graph-reports",
  },
  {
    id: 7,
    title: "Discount <br/>Reports",
    icon: <DiscountOutlinedIcon sx={{ fontSize: "36px" }} />,
    reportLink: "/salon/graph-reports",
  },
];

export default function ReportsList() {
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
        {t("Reports")}
      </Typography>

      <Grid container spacing={4}>
        {reportList.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ textAlign: "center", padding: "10px 0 20px 0" }}>
              <CardContent sx={{ paddingBottom: "10px" }}>
                {data.icon}
                <Typography
                  gutterBottom
                  variant="h4"
                  dangerouslySetInnerHTML={{
                    __html: data.title,
                  }}
                  sx={{ marginTop: "10px" }}
                />
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={data.reportLink}>
                  <Button size="small" variant="outlined">
                    View Report
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
