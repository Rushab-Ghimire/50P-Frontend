import React, { useCallback, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  CHListItem,
  CHTitle,
} from "@app/modules/AskDaysi/styles/admin/ChatHistory";
import { GLOBAL } from "@app/_utilities/globals";
import { gqlMutate, gqlQuery, queryClient } from "@app/_utilities/http";
import { useMutation, useQuery } from "react-query";
import { gql } from "graphql-request";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { BouncingDotsLoader } from "@app/_components/apps";
import { useNavigate } from "react-router-dom";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import KeywordsModal from "../../dialogs/Keywords";

export const queryDocument = (threadId) => {
  return gql`
    query Query {
    chatHistoryByCategory(categoryId: ${threadId}) {
        content
        id
        source
        chatHistoryCategory {
          id
        }
      }
    }
`;
};

export const allThreads = () => {
  return gql`
    query Query {
      chatHistoryCategory(first: 100, search: "", skip: 0) {
        totalCount
        rows {
          id
          title
        }
      }
    }
  `;
};

export const deleteThread = (id) => {
  return gql`
  mutation Mutation {
    chatHistoryCategoryDelete(
          id: ${id}
        ) {
        ok
      }
  }
`;
};

const progressStyle = {
  height: "10px !important",
  width: "10px !important",
  marginRight: "5px",
  marginTop: "10px",
};

const AskDaysiChatHistory = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [history, setHistory] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(-1);
  const navigate = useNavigate();

  const setNewChat = () => {
    window.resetChatWindow();
    refreshThreads();
  };

  const loadHistory = (data) => {
    //console.log("loading for ", data);

    if (!document.location.href.includes("dashboard")) {
      navigate("/askdaysi/dashboard");
      setTimeout(() => {
        setLoading(data.id);
        GLOBAL.chat_thread_id = data.id;
        GLOBAL.chat_thread_title = data.title.trim();
        setHistory(true);
        //queryClient.invalidateQueries({ queryKey: ["chat_history"] });
        setRefresh(refresh + 1);
      }, 300);
    } else {
      setLoading(data.id);
      GLOBAL.chat_thread_id = data.id;
      GLOBAL.chat_thread_title = data.title.trim();
      setHistory(true);
      //queryClient.invalidateQueries({ queryKey: ["chat_history"] });
      setRefresh(refresh + 1);
    }
  };

  const handleClick = (event, index, data) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const {
    mutate,
    isPending,
    isError: isErrorMutate,
    error: errorMutate,
  } = useMutation({
    mutationFn: gqlMutate,
  });

  const handleDelete = (d) => {
    //console.log("deleting", d);
    mutate({
      inData: { gql: deleteThread(d.id) },
      path: "/graphql",
      onSuccess: (dx) => {
        queryClient.invalidateQueries({ queryKey: ["all_threads"] });
        setRefresh(refresh + 1);
      },
    });

    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const refreshThreads = useCallback(() => {
    //console.log("refreshing all threads");
    queryClient.invalidateQueries({ queryKey: ["all_threads"] });
    setRefresh(refresh + 1);
  });

  const {
    data: dataThreads,
    isLoading: isLoadingThreads,
    isError: isErrorThreads,
    error: errorThreads,
  } = useQuery({
    queryKey: ["all_threads", { gql: allThreads() }],
    onSuccess: (dx) => {
      //console.log("allthreads loaded", dx);
      window.refreshThreads = refreshThreads;
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: queryKey[1],
      }),
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chat_history", { gql: queryDocument(GLOBAL.chat_thread_id) }],
    onSuccess: (dx) => {
      if (history) {
        //console.log("chat_history", GLOBAL.chat_thread_id, dx);
        setHistory(false);
        if (Object.keys(dx).length > 0) {
          window.loadHistory(dx);
        } else {
          window.loadHistory([]);
        }
        setLoading(-1);
      }
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: GLOBAL.chat_thread_id == -1 ? -1 : history ? queryKey[1] : -1,
      }),
  });

  const [collapsed, setCollapsed] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack>
          <CHTitle variant="h3" sx={{ margin: "0 0 0 12px " }}>
            Chat History
          </CHTitle>
        </Stack>

        <Stack>
          <Typography
            variant="h4"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            sx={{
              marginBottom: "0",
              cursor: "pointer",
              position: "relative",
              marginLeft: "5px",
              border: "1px solid",
              padding: "2px 24px 2px 5px",
              borderRadius: "5px",
              width: "75px",
            }}
          >
            {collapsed ? (
              <>
                Show
                <ExpandMoreOutlinedIcon
                  sx={{ position: "absolute", top: "0px" }}
                />
              </>
            ) : (
              <>
                Hide
                <ExpandLessOutlinedIcon
                  sx={{ position: "absolute", top: "0px" }}
                />
              </>
            )}
          </Typography>
        </Stack>
        <Stack>
          <IconButton
            onClick={() => {
              setNewChat();
            }}
          >
            <MapsUgcOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
      {/* <Box>
        <Button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          sx={{ marginLeft: "25px" }}
        >
          {collapsed ? (
            <>
              Show Chat History
              <ExpandMoreOutlinedIcon />
            </>
          ) : (
            <>
              Hide Chat History
              <ExpandLessOutlinedIcon />
            </>
          )}
        </Button>
      </Box> */}
      {!collapsed && dataThreads !== undefined && (
        <List>
          {dataThreads.rows?.map((dataT, index) => (
            <Tooltip key={"thread-id-" + dataT.id} title={dataT.title}>
              <CHListItem
                selected={dataT.id == GLOBAL.chat_thread_id}
                key={index}
                secondaryAction={
                  <React.Fragment>
                    <IconButton
                      edge="end"
                      onClick={(event) => handleClick(event, index, dataT)}
                    >
                      <MoreHorizOutlinedIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedIndex === index}
                      onClose={handleClose}
                    >
                      {/* <MenuItem onClick={handleClose}>Share</MenuItem>
                  <MenuItem onClick={handleClose}>Rename</MenuItem>
                  <MenuItem onClick={handleClose}>Archive</MenuItem> */}
                      <MenuItem onClick={handleOpen}>Keywords</MenuItem>
                      <KeywordsModal
                        isDialogOpened={isOpen}
                        handleCloseDialog={() => setIsOpen(false)}
                        title={dataT.title}
                      />
                      <MenuItem
                        onClick={() => {
                          handleDelete(dataT);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                }
              >
                <Stack flexDirection={"row"}>
                  {dataT.id == loading && (
                    <CircularProgress sx={progressStyle} />
                  )}
                  <ListItemText
                    onClick={(e) => {
                      loadHistory(dataT);
                    }}
                    primary={dataT.title}
                  />
                </Stack>
              </CHListItem>
            </Tooltip>
          ))}
        </List>
      )}
    </>
  );
};

export default AskDaysiChatHistory;
