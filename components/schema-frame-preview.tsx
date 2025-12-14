"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import DatabaseSchemaNode from "@/components/DatabaseSchemaNode";
import type { Field } from "@/types/schema-types";

type SchemaPreviewNodeData = {
  label: string;
  schema: Field[];
  nodeId: string;
  isEditing?: boolean;
};

const nodeTypes: NodeTypes = {
  databaseSchema: DatabaseSchemaNode,
};

const initialNodes: Node<SchemaPreviewNodeData>[] = [
  // USERS (bottom-left)
  {
    id: "users",
    type: "databaseSchema",
    position: { x: -380, y: 260 },
    data: {
      nodeId: "users",
      label: "users",
      schema: [
        {
          id: "users-_id",
          name: "_id",
          type: "objectId",
          handleType: "source",
          required: true,
          unique: true,
          nullable: false,
        },
        {
          id: "users-email",
          name: "email",
          type: "string",
          handleType: "none",
          required: true,
          unique: true,
          nullable: false,
          index: true,
        },
        {
          id: "users-name",
          name: "name",
          type: "string",
          handleType: "none",
          required: true,
          nullable: false,
        },
        {
          id: "users-role",
          name: "role",
          type: "string",
          handleType: "none",
          required: true,
          default: "user",
        },
        {
          id: "users-createdAt",
          name: "createdAt",
          type: "date",
          handleType: "none",
          required: true,
        },
        {
          id: "users-lastLoginAt",
          name: "lastLoginAt",
          type: "date",
          handleType: "none",
          nullable: true,
        },
      ],
    },
  },

  // PROJECTS (top-center)
  {
    id: "projects",
    type: "databaseSchema",
    position: { x: 0, y: -40 },
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
        {
          id: "projects-slug",
          name: "slug",
          type: "string",
          handleType: "none",
          required: true,
          unique: true,
          index: true,
        },
        {
          id: "projects-status",
          name: "status",
          type: "string",
          handleType: "none",
          required: true,
          default: "active",
        },
        {
          id: "projects-createdAt",
          name: "createdAt",
          type: "date",
          handleType: "none",
          required: true,
        },
      ],
    },
  },

  // API_KEYS (bottom-center / right)
  {
    id: "apiKeys",
    type: "databaseSchema",
    position: { x: 160, y: 300 },
    data: {
      nodeId: "apiKeys",
      label: "api_keys",
      schema: [
        {
          id: "apiKeys-_id",
          name: "_id",
          type: "objectId",
          handleType: "source",
          required: true,
          unique: true,
          nullable: false,
        },
        {
          id: "apiKeys-userId",
          name: "userId",
          type: "objectId",
          handleType: "target", // FK to users._id
          required: true,
        },
        {
          id: "apiKeys-projectId",
          name: "projectId",
          type: "objectId",
          handleType: "target", // FK to projects._id
          required: true,
        },
        {
          id: "apiKeys-key",
          name: "key",
          type: "string",
          handleType: "none",
          required: true,
          unique: true,
        },
        {
          id: "apiKeys-scopes",
          name: "scopes",
          type: "array",
          arrayItemType: "string",
          handleType: "none",
        },
        {
          id: "apiKeys-active",
          name: "active",
          type: "boolean",
          handleType: "none",
          required: true,
          default: true,
        },
        {
          id: "apiKeys-createdAt",
          name: "createdAt",
          type: "date",
          handleType: "none",
          required: true,
        },
      ],
    },
  },

  // WORKFLOWS (mid-right)
  {
    id: "workflows",
    type: "databaseSchema",
    position: { x: 360, y: 40 },
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
        {
          id: "workflows-version",
          name: "version",
          type: "number",
          handleType: "none",
          required: true,
          default: 1,
        },
        {
          id: "workflows-isActive",
          name: "isActive",
          type: "boolean",
          handleType: "none",
          required: true,
          default: true,
        },
        {
          id: "workflows-trigger",
          name: "trigger",
          type: "string",
          handleType: "none",
          required: true,
        },
      ],
    },
  },

  // WORKFLOW_RUNS (far right)
  {
    id: "workflowRuns",
    type: "databaseSchema",
    position: { x: 720, y: 200 },
    data: {
      nodeId: "workflowRuns",
      label: "workflow_runs",
      schema: [
        {
          id: "workflowRuns-_id",
          name: "_id",
          type: "objectId",
          handleType: "source",
          required: true,
          unique: true,
          nullable: false,
        },
        {
          id: "workflowRuns-workflowId",
          name: "workflowId",
          type: "objectId",
          handleType: "target", // FK to workflows._id
          required: true,
        },
        {
          id: "workflowRuns-projectId",
          name: "projectId",
          type: "objectId",
          handleType: "target", // FK to projects._id
          required: true,
        },
        {
          id: "workflowRuns-triggeredByUserId",
          name: "triggeredByUserId",
          type: "objectId",
          handleType: "target", // FK to users._id
          required: true,
        },
        {
          id: "workflowRuns-status",
          name: "status",
          type: "string",
          handleType: "none",
          required: true,
          default: "running",
        },
        {
          id: "workflowRuns-startedAt",
          name: "startedAt",
          type: "date",
          handleType: "none",
          required: true,
        },
        {
          id: "workflowRuns-finishedAt",
          name: "finishedAt",
          type: "date",
          handleType: "none",
          nullable: true,
        },
      ],
    },
  },
];

const initialEdges: Edge[] = [
  // users._id → projects.ownerId
  {
    id: "e-users-_id-projects-ownerId",
    source: "users",
    target: "projects",
    sourceHandle: "src-users-_id",
    targetHandle: "tgt-projects-ownerId",
  },
  // users._id → apiKeys.userId
  {
    id: "e-users-_id-apiKeys-userId",
    source: "users",
    target: "apiKeys",
    sourceHandle: "src-users-_id",
    targetHandle: "tgt-apiKeys-userId",
  },
  // projects._id → apiKeys.projectId
  {
    id: "e-projects-_id-apiKeys-projectId",
    source: "projects",
    target: "apiKeys",
    sourceHandle: "src-projects-_id",
    targetHandle: "tgt-apiKeys-projectId",
  },
  // projects._id → workflows.projectId
  {
    id: "e-projects-_id-workflows-projectId",
    source: "projects",
    target: "workflows",
    sourceHandle: "src-projects-_id",
    targetHandle: "tgt-workflows-projectId",
  },
  // projects._id → workflowRuns.projectId
  {
    id: "e-projects-_id-workflowRuns-projectId",
    source: "projects",
    target: "workflowRuns",
    sourceHandle: "src-projects-_id",
    targetHandle: "tgt-workflowRuns-projectId",
  },
  // workflows._id → workflowRuns.workflowId
  {
    id: "e-workflows-_id-workflowRuns-workflowId",
    source: "workflows",
    target: "workflowRuns",
    sourceHandle: "src-workflows-_id",
    targetHandle: "tgt-workflowRuns-workflowId",
  },
  // users._id → workflowRuns.triggeredByUserId
  {
    id: "e-users-_id-workflowRuns-triggeredByUserId",
    source: "users",
    target: "workflowRuns",
    sourceHandle: "src-users-_id",
    targetHandle: "tgt-workflowRuns-triggeredByUserId",
  },
];

export default function SchemaHeroPreview() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<SchemaPreviewNodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: `e-${params.source}-${params.target}-${Date.now()}`,
          },
          eds
        )
      );
    },
    [setEdges]
  );

  return (
    <div className="h-[380px] sm:h-[480px] md:h-[600px] lg:h-[765px] min-w-xs lg:min-w-6xl w-full bg-neutral-100 dark:bg-neutral-900 rounded-md overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        elementsSelectable
        nodesDraggable
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnPinch={false}
        preventScrolling={false}
        className="hidden lg:block"
      >
        <Background
          gap={16}
          size={1}
          className="text-black dark:text-neutral-500"
        />
      </ReactFlow>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, minZoom: 0.2 }}
        proOptions={{ hideAttribution: true }}
        elementsSelectable
        nodesDraggable
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnPinch={false}
        preventScrolling={false}
        className="lg:hidden block"
      >
        <Background
          gap={16}
          size={1}
          className="text-black dark:text-neutral-500"
        />
      </ReactFlow>
    </div>
  );
}
