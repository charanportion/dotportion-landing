"use client";
import type { Edge, EdgeProps as RFEdgeProps } from "@xyflow/react";
import type { ReactNode } from "react";
import { BaseEdge, getSmoothStepPath } from "@xyflow/react";
import { useTheme } from "next-themes";

type AnimatedEdgeData = {
  animate?: boolean;
  label?: ReactNode;
};

type AnimatedEdge = Edge<AnimatedEdgeData, "animatedSvg">;

type AnimatedSVGEdgeProps = RFEdgeProps<AnimatedEdge>;

export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  labelStyle,
  markerStart,
  markerEnd,
  interactionWidth,
}: AnimatedSVGEdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const animate = data?.animate;

  const { theme } = useTheme();

  const color = theme === "dark" ? "#fff" : "#121212";

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        label={label}
        labelStyle={labelStyle}
        markerStart={markerStart}
        markerEnd={markerEnd}
        interactionWidth={interactionWidth}
      />
      {animate && (
        <circle r="6" fill={color}>
          <animateMotion dur="1.6s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  );
}
