"use client";

import { useCallback } from "react";

// React Flow imports
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

import { APIStartNode } from "@/components/nodes/api-start-node";
import { ParameterNode } from "@/components/nodes/parameter-node";
import { ConditionNode } from "@/components/nodes/condition-node";
import DataBaseNode from "@/components/nodes/database-node";
import JwtVerifyNode from "@/components/nodes/jwt-verify-node";
import { ResponseNode } from "@/components/nodes/response-node";
import type { NodeData } from "@/types/node-types";

const nodeTypes: NodeTypes = {
  apiStart: APIStartNode,
  parameters: ParameterNode,
  condition: ConditionNode,
  database: DataBaseNode,
  jwtVerify: JwtVerifyNode,
  response: ResponseNode,
};

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    type: "apiStart",
    position: { x: 80, y: -360 },
    data: {
      label: "API Endpoint",
      method: "POST",
      path: "/update-user",
      description: "Entry point for the API",
    },
  },
  {
    id: "param-1752034007346",
    type: "parameters",
    position: { x: 160, y: -150 },
    data: {
      label: "Request Parameters",
      description: "Define request parameters",
      id: "param-1752034007346",
      // adapted to ParameterNode expectation
      sources: [
        {
          from: "body",
          parameters: {
            email: { required: true },
            name: { required: true },
          },
        },
        {
          from: "headers",
          parameters: {
            authorization: { required: true },
          },
        },
      ],
    },
  },
  {
    id: "jwtVerify-1752034037500",
    type: "jwtVerify",
    position: { x: 580, y: -30 },
    data: {
      label: "JWT Verify",
      description: "Send response to client",
      type: "jwt",
      id: "jwtVerify-1752034037500",
    },
  },
  {
    id: "database-1752034010712",
    type: "database",
    position: { x: 265, y: 100 },
    data: {
      label: "Data Base",
      description: "Make Database Operations",
      collection: "users",
      provider: "mongodb",
      operation: "findOne",
      id: "database-1752034010712",
      query: {
        email: "{{param-1752034007346.result.email}} ",
      },
    },
  },
  {
    id: "condition-1752034031488",
    type: "condition",
    position: { x: 260, y: 260 },
    data: {
      label: "Condition Node",
      description: "Make Condition Operations",
      condition:
        "{{database-1752034010712.result.email}} == {{param-1752034007346.result.email}} ",
      trueEdgeId: "econdition-1752034031488-database-1752034115444",
      falseEdgeId: "econdition-1752034031488-response-1752034102762",
      id: "condition-1752034031488",
    },
  },
  {
    id: "database-1752034115444",
    type: "database",
    position: { x: 115, y: 430 },
    data: {
      label: "Data Base",
      description: "Make Database Operations",
      collection: "users",
      provider: "mongodb",
      operation: "updateOne",
      id: "database-1752034115444",
      query: {
        email: "{{param-1752034007346.result.email}} ",
      },
      data: {
        name: "{{param-1752034007346.result.name}} ",
      },
    },
  },
  {
    id: "2",
    type: "response",
    position: { x: 35, y: 655 },
    data: {
      label: "API Response",
      description: "Send response to client",
      status: 201,
      id: "2",
    },
  },
  {
    id: "response-1752034102762",
    type: "response",
    position: { x: 575, y: 400 },
    data: {
      label: "API Response",
      statusCode: 200,
      responseType: "application/json",
      responseBody: '{\n  "success": true\n}',
      description: "Send response to client",
      output: {
        success: true,
      },
      id: "response-1752034102762",
      status: 400,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-param-1752034007346",
    source: "1",
    target: "param-1752034007346",
    sourceHandle: "out",
    targetHandle: "in",
  },
  {
    id: "eparam-1752034007346-jwtVerify-1752034037500",
    source: "param-1752034007346",
    target: "jwtVerify-1752034037500",
    sourceHandle: "out",
    targetHandle: "in",
  },
  {
    id: "ejwtVerify-1752034037500-database-1752034010712",
    source: "jwtVerify-1752034037500",
    target: "database-1752034010712",
    sourceHandle: "out",
    targetHandle: "in",
  },
  {
    id: "edatabase-1752034010712-condition-1752034031488",
    source: "database-1752034010712",
    target: "condition-1752034031488",
    sourceHandle: "out",
    targetHandle: "in",
  },
  {
    id: "econdition-1752034031488-database-1752034115444",
    source: "condition-1752034031488",
    target: "database-1752034115444",
    sourceHandle: "true",
    targetHandle: "in",
  },
  {
    id: "econdition-1752034031488-response-1752034102762",
    source: "condition-1752034031488",
    target: "response-1752034102762",
    sourceHandle: "false",
    targetHandle: "in",
  },
  {
    id: "edatabase-1752034115444-2",
    source: "database-1752034115444",
    target: "2",
    sourceHandle: "out",
    targetHandle: "in",
  },
];

export default function HeroFlowPreview() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<NodeData>>(initialNodes);
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
    <div
      className="
        w-full min-w-0
        h-[380px] sm:h-[480px] md:h-[600px] lg:h-[765px]
        bg-neutral-50 dark:bg-neutral-900
        rounded-md overflow-hidden
      "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        fitViewOptions={{ padding: 0.3 }}
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
        {/* <Controls className="border border-neutral-300 text-black dark:text-white bg-white  dark:bg-neutral-900" /> */}
        {/* <MiniMap className="border border-neutral-300 bg-white/70" /> */}
      </ReactFlow>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        fitViewOptions={{ padding: 0.3, minZoom: 0.1 }}
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
        {/* <Controls className="border border-neutral-300 text-black dark:text-white bg-white  dark:bg-neutral-900" /> */}
        {/* <MiniMap className="border border-neutral-300 bg-white/70" /> */}
      </ReactFlow>
    </div>
  );
}
