import { Handle, Position, NodeToolbar, useReactFlow } from "@xyflow/react";
import React, { useEffect, useState, useCallback } from "react";
import "@app/_styles/style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function CustomNode({ id, data }) {
  const { deleteElements } = useReactFlow();

  const onClick = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  return (
    <>
      <NodeToolbar isVisible={true} position={Position.Top}>
        <button onClick={onClick}>
          <RemoveCircleOutlineIcon color="error" sx={{ cursor: "pointer" }} />
        </button>
      </NodeToolbar>

      <div className="text-updater-node">{data.label}</div>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
    </>
  );
}
