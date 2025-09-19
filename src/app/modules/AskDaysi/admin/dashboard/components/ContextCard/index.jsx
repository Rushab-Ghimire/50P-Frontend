import React, { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  addEdge,
} from "@xyflow/react";
import {
  Container,
  Typography,
  Card,
  Stack,
  Button,
  Box,
  TextField,
  ButtonGroup,
} from "@mui/material";
import "@xyflow/react/dist/style.css";
import { useParams } from "react-router-dom";
import CardNode from "./CardNode";
import CardEdge from "./CardEdge";
import ContextCard from "@app/_shared/Modals/ContextCard";
import { green } from "@mui/material/colors";
import {
  queryDocument,
  getBusiness,
  getCard,
  getContextTreeByKey,
  updateGraph,
  deleteCard,
  attachCard,
} from "./Documents";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { GLOBAL } from "@app/_utilities/globals";
import ADContextCard from "../../dialogs/ADContextCard";

const nodeTypes = { tfNode: CardNode };
const edgeTypes = { buttonedge: CardEdge };

const initialNodes = [];

const markerStyleOverride = {
  markerEnd: {
    type: MarkerType.Arrow,
    width: 15,
    height: 15,
    color: green[700],
  },
  style: {
    strokeWidth: 2,
    stroke: green[700],
  },
};

const initialEdges = [];

const ADContextCardDesign = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const params = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [editNode, setEditNode] = useState({});

  const {
    mutate,
    isPending: pendingMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useMutation({
    mutationFn: gqlMutate,
  });

  const onNodeDelete = useCallback((params) => {
    mutate({
      inData: {
        gql: deleteCard(params["nodes"][0]["id"]),
      },
      path: "/graphql",
    });
  }, []);

  const onNodeDragStop = useCallback((e, node) => {
    mutate({
      inData: {
        gql: updateGraph({
          id: node["id"],
          graph_attributes: node["position"],
        }),
      },
      path: "/graphql",
    });
  }, []);

  const onNodesChange = useCallback((changes) => {
    //console.log("onNodesChange", changes[0]["id"], changes[0]["position"]);
    setNodes((nds) => {
      return applyNodeChanges(changes, nds);
    });
  }, []);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeDoubleClick = useCallback((event, node) => {
    setIsAdding(true);
    setEditNode((prev) => {
      return node;
    });
  });

  // const {
  //   data: businessData,
  //   isLoading: isLoadingFetch,
  //   isError: isErrorFetch,
  //   error: errorFetch,
  // } = useQuery({
  //   queryKey: ["business", { id: params.id }],
  //   queryFn: ({ signal, queryKey }) =>
  //     gqlQuery({
  //       signal,
  //       path: "/graphql",
  //       inData: params.id === undefined ? -1 : { gql: getBusiness(params.id) },
  //     }),
  // });

  const [businessData, setBusinessData] = useState(undefined);
  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = useCallback(() => {
    setBusinessData((p) =>
      GLOBAL.userDetail.organizations
        ? GLOBAL.userDetail.organizations[0].organization
        : undefined
    );

    if (GLOBAL.userDetail?.organizations === undefined) {
      setTimeout(() => {
        loadUserSession();
      }, 500);
    }
  });

  const {
    data: cardData,
    isLoading: isLoadingCardFetch,
    isError: isErrorCardFetch,
    error: errorCardFetch,
  } = useQuery({
    queryKey: ["card", { id: -1 }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: {
          gql: editNode["data"]
            ? getCard(editNode["id"], -1, businessData.id)
            : getContextTreeByKey("root", businessData.id),
        },
      }),
  });

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        mutate({
          inData: {
            gql: attachCard(params["target"], params["source"]),
          },
          path: "/graphql",
        });

        params = {
          ...params,
          style: markerStyleOverride["style"],
          markerEnd: markerStyleOverride["markerEnd"],
          id: `${params["source"]} -> ${params["target"]}`,
          type: "buttonedge",
        };
        return addEdge(params, eds);
      }),
    []
  );

  const setupInitialConfiguration = useCallback(() => {
    //if (cardData["rows"].length <= 1 && cardData["rows"][0]["parent"] == -1)
    {
      setIsSetup(true);
      cardData["rows"].forEach((item, index) => {
        let pos = item["graphAttributes"].split(",");
        pos =
          pos.length >= 2
            ? { x: Number(pos[0]), y: Number(pos[1]) }
            : { x: 50, y: 50 };

        setNodes((els) => {
          return [
            ...els,
            {
              id: `${item["id"]}`,
              data: {
                label: item["title"],
                context: item["context"],
              },
              position: pos,
              type: "tfNode",
            },
          ];
        });

        if (item["parent"] >= 0) {
          setEdges((eds) => {
            return addEdge(
              {
                source: `${item["parent"]}`,
                target: `${item["id"]}`,
                style: markerStyleOverride["style"],
                markerEnd: markerStyleOverride["markerEnd"],
                id: `${item["parent"]} -> ${item["id"]}`,
                type: "buttonedge",
              },
              eds
            );
          });
        }
      });
    }
  }, [cardData]);

  if (cardData) {
    if (!isSetup) setupInitialConfiguration();
  }

  const deleteNodeById = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const handleAdd = useCallback((item) => {
    console.log("adding...", item);

    deleteNodeById(item["c_node"]["id"]);

    setNodes((els) => {
      closeCardModal();
      return [
        ...els,
        {
          id: `${item["id"]}`,
          data: { label: item["title"], context: item["context"] },
          position: item["c_node"]["position"],
          type: "tfNode",
        },
      ];
    });

    setEdges((eds) => {
      return addEdge(
        {
          source: `${item["parent"]}`,
          target: `${item["id"]}`,
          style: markerStyleOverride["style"],
          markerEnd: markerStyleOverride["markerEnd"],
          id: `${item["parent"]} -> ${item["id"]}`,
          type: "buttonedge",
        },
        eds
      );
    });
  }, []);

  //console.log("allNodes", nodes);

  function addCard() {
    setIsAdding(true);
  }

  const closeCardModal = useCallback((node) => {
    setIsAdding(false);
  }, []);

  function doSave() {
    //console.log(nodes, edges);
  }

  return (
    <>
      {isAdding && (
        <ADContextCard
          organization_id={businessData.id}
          c_node={editNode}
          handleClose={closeCardModal}
          handle={handleAdd}
        />
      )}

      <header>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            maxWidth: "100%",
            justifyContent: "space-between",
            marginBottom: "0px",
            gap: "20px",
          }}
        >
          <Stack>
            {businessData && (
              <Typography variant={"h2"} mb={3}>
                {businessData?.business?.title}
              </Typography>
            )}
          </Stack>
          <Stack></Stack>
        </Box>
      </header>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeDragStop={onNodeDragStop}
        onDelete={onNodeDelete}
        fitView="true"
      >
        <MiniMap />
        <Background />
      </ReactFlow>
    </>
  );
};

export default ADContextCardDesign;
