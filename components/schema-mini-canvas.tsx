// components/schema-mini-canvas.tsx
"use client";

import React from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";

import DatabaseSchemaNode from "@/components/DatabaseSchemaNode";
import type { Field } from "@/types/schema-types";
import "@xyflow/react/dist/style.css";

type SchemaMiniNodeData = {
  label: string;
  schema: Field[];
  nodeId: string;
};

const nodeTypes: NodeTypes = {
  databaseSchema: DatabaseSchemaNode,
};

const miniNodes: Node<SchemaMiniNodeData>[] = [
  // PROJECTS (center / top)
  {
    id: "projects",
    type: "databaseSchema",
    position: { x: -50, y: 40 },
    data: {
      nodeId: "projects",
      label: "projects",
      schema: [
        {
          id: "projects-_id",
          name: "_id",
          type: "objectId",
          handleType: "source",
          required: true,
          unique: true,
          nullable: false,
        },
        {
          id: "projects-ownerId",
          name: "ownerId",
          type: "objectId",
          handleType: "target", // FK to users._id
          required: true,
        },
        {
          id: "projects-name",
          name: "name",
          type: "string",
          handleType: "none",
          required: true,
        },
      ],
    },
  },

  // WORKFLOWS (right / bottom)
  {
    id: "workflows",
    type: "databaseSchema",
    position: { x: 300, y: 300 },
    data: {
      nodeId: "workflows",
      label: "workflows",
      schema: [
        {
          id: "workflows-_id",
          name: "_id",
          type: "objectId",
          handleType: "source",
          required: true,
          unique: true,
          nullable: false,
        },
        {
          id: "workflows-projectId",
          name: "projectId",
          type: "objectId",
          handleType: "target", // FK to projects._id
          required: true,
        },
        {
          id: "workflows-name",
          name: "name",
          type: "string",
          handleType: "none",
          required: true,
        },
      ],
    },
  },
];

const miniEdges: Edge[] = [
  // projects._id → workflows.projectId
  {
    id: "e-projects-_id-workflows-projectId",
    source: "projects",
    target: "workflows",
    sourceHandle: "src-projects-_id",
    targetHandle: "tgt-workflows-projectId",
    style: {
      stroke: "#737373", // neutral-500
      strokeWidth: 1.5,
    },
  },
];

export default function SchemaMiniCanvas() {
  const [nodes, , onNodesChange] =
    useNodesState<Node<SchemaMiniNodeData>>(miniNodes);
  const [edges, , onEdgesChange] = useEdgesState(miniEdges);

  return (
    <div className="w-[260px] h-[200px] md:w-[350px] md:h-[260px] rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, minZoom: 0.3 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        preventScrolling={false}
      />
    </div>
  );
}
