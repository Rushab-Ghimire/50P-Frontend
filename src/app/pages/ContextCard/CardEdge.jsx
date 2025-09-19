import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

import { queryDocument, detachCard } from "./Documents";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";

export default function CardEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeDelete = () => {
    setEdges((edges) => {
      let deletedEdge = edges.filter((edge) => edge.id === id);

      mutate({
        inData: {
          gql: detachCard(deletedEdge[0]["target"]),
        },
        path: "/graphql",
      });

      return edges.filter((edge) => edge.id !== id);
    });
  };

  const {
    mutate,
    isPending: pendingMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useMutation({
    mutationFn: gqlMutate,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeDelete}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
