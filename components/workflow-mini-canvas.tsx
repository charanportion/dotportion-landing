// components/workflow-mini-canvas.tsx
"use client";

import React, { useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";

import { APIStartNode } from "@/components/nodes/api-start-node";
import { ResponseNode } from "@/components/nodes/response-node";
import type { NodeData } from "@/types/node-types";
import { AnimatedSVGEdge } from "@/components/edges/animated-svg-edge";
import "@xyflow/react/dist/style.css";

const miniNodeTypes: NodeTypes = {
  apiStart: APIStartNode,
  response: ResponseNode,
};

const miniEdgeTypes: EdgeTypes = {
  animatedSvg: AnimatedSVGEdge,
};

const miniNodes: Node<NodeData>[] = [
  {
    id: "api-start",
    type: "apiStart",
    position: { x: 150, y: 40 },
    data: {
      label: "API Start",
      method: "POST",
      path: "/workflow",
      description: "Entry point",
    },
  },
  {
    id: "api-response",
    type: "response",
    position: { x: 300, y: 300 },
    data: {
      label: "API Response",
      description: "Return result",
      status: 200,
      id: "api-response",
    },
  },
];

const miniEdges: Edge[] = [
  {
    id: "e-api-start-api-response",
    type: "animatedSvg",
    source: "api-start",
    target: "api-response",
    sourceHandle: "out",
    targetHandle: "in",
    data: { animate: false }, // default: no animation
  },
];

interface WorkflowMiniCanvasProps {
  animate: boolean;
}

export default function WorkflowMiniCanvas({
  animate,
}: WorkflowMiniCanvasProps) {
  const [nodes, , onNodesChange] = useNodesState<Node<NodeData>>(miniNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(miniEdges);

  // Toggle the edge animation based on prop
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        data: { ...(edge.data ?? {}), animate },
      }))
    );
  }, [animate, setEdges]);

  return (
    <div className="w-[260px] h-[200px] md:w-[350px] md:h-[280px] rounded-lg bg-transparent overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={miniNodeTypes}
        edgeTypes={miniEdgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, minZoom: 0.7 }}
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
