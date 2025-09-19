import { Handle, Position, NodeToolbar, useReactFlow } from "@xyflow/react";
import React, { useEffect, useState, useCallback } from "react";
import "@app/_styles/style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuid } from "uuid";

export default function CardNode({ id, data }) {
  const { deleteElements, addNodes, getNode } = useReactFlow();
  const [showToolbar, setShowToolbar] = useState(false);

  const onRemoveClick = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  const onAddClick = useCallback(() => {
    let nd = getNode(id);
    addNodes([
      {
        id: uuid(),
        data: {
          label: "Double Click to Edit",
          context: "-",
          parent: Number(id),
        },
        position: { x: nd.position.x + 40, y: nd.position.y + 40 },
        type: "tfNode",
        isNew: true,
      },
    ]);
  });

  const mouseEnter = useCallback(() => {
    setShowToolbar(true);
  });

  const mouseLeave = useCallback(() => {
    setShowToolbar(false);
  });

  return (
    <div onMouseLeave={mouseLeave} onMouseEnter={mouseEnter}>
      <NodeToolbar isVisible={showToolbar} position={Position.Top}>
        <button onClick={onRemoveClick}>
          <RemoveCircleOutlineIcon color="error" sx={{ cursor: "pointer" }} />
        </button>
        {!isNaN(id) && (
          <button onClick={onAddClick}>
            <AddCircleOutlineIcon color="info" sx={{ cursor: "pointer" }} />
          </button>
        )}
      </NodeToolbar>

      <div className="text-updater-node">{data.label}</div>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
}
