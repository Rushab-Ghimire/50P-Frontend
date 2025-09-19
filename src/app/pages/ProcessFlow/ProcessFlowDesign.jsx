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
import CustomNode from "./CustomNode";
import ProcessSelector from "@app/_shared/Modals/ProcessSelector";
import { green } from "@mui/material/colors";
import { queryDocument, getDocument } from "./Documents";
import { useQuery } from "react-query";
import { queryClient, gqlQuery } from "@app/_utilities/http.js";

const nodeTypes = { tfNode: CustomNode };

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

const ProcessFlowDesign = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const params = useParams();
  const [isAdding, setIsAdding] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const deleteNodeById = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const {
    data: processFlowData,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["processflow", { id: params.id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: params.id === undefined ? -1 : { gql: getDocument(params.id) },
      }),
  });

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        params = {
          ...params,
          style: markerStyleOverride["style"],
          markerEnd: markerStyleOverride["markerEnd"],
          id: `${params["source"]} -> ${params["target"]}`,
        };
        return addEdge(params, eds);
      }),
    []
  );

  const handleAdd = useCallback((item) => {
    setNodes((els) => {
      closeProcessModal();
      return [
        ...els,
        {
          id: `${item["id"]}`,
          data: { label: item["title"] },
          position: { x: 50, y: 50 },
          type: "tfNode",
        },
      ];
    });
  }, []);

  function addProcess() {
    setIsAdding(true);
  }

  function closeProcessModal() {
    setIsAdding(false);
  }

  function doSave() {
    console.log(nodes, edges);
  }

  return (
    <>
      {isAdding && (
        <ProcessSelector handleClose={closeProcessModal} handle={handleAdd} />
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
            {processFlowData && (
              <Typography variant={"h2"} mb={3}>
                {processFlowData["title"]}
              </Typography>
            )}
          </Stack>
          <Stack>
            <ButtonGroup>
              <Button
                onClick={() => {
                  addProcess();
                }}
                variant={"contained"}
                size={"medium"}
                color={"primary"}
                sx={{ backgroundColor: "primary.light" }}
              >
                Add Process
              </Button>
              <Button
                onClick={() => {
                  doSave();
                }}
                variant={"contained"}
                size={"medium"}
                color={"primary"}
                sx={{ backgroundColor: "primarr.dark_1" }}
              >
                Save
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </header>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Background />
      </ReactFlow>
    </>
  );
};

export default ProcessFlowDesign;
