import { Handle, Position } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import type { NodeData } from "@/types/node-types";

export function ConditionNode({
  data,
  isConnectable,
  selected,
  id,
}: {
  data: NodeData;
  isConnectable: boolean;
  selected: boolean;
  id: string;
}) {
  const conditionPreview = data.condition
    ? data.condition.substring(0, 25) +
      (data.condition.length > 25 ? "..." : "")
    : "No condition set";

  return (
    <div
      className={`rounded-md border w-[200px] overflow-hidden relative
        bg-white dark:bg-neutral-800
        ${
          selected
            ? "border-amber-500 ring-1 ring-amber-500"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 bg-amber-500 border-2 border-white dark:border-neutral-900"
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-amber-50 dark:bg-amber-500/10">
        <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
          <GitBranch className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate">
            {data.label || "Condition"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 py-2 pb-6 space-y-1.5">
        <div className="bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-1">
          <code className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono block truncate">
            {conditionPreview}
          </code>
        </div>

        <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">
          {id}
        </div>
      </div>

      {/* True Output Handle (Bottom) */}
      <div className="absolute bottom-0 left-5 flex flex-col items-center translate-y-1/2">
        <Handle
          type="source"
          position={Position.Bottom}
          id="true"
          isConnectable={isConnectable}
          className="w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-neutral-900 relative transform-none left-0 top-0"
        />
        <span className="text-[9px] text-green-600 dark:text-green-400 font-medium mt-1">
          True
        </span>
      </div>

      {/* False Output Handle (Right) */}
      <div className="absolute right-0 top-1/2 flex items-center -translate-y-1/2 translate-x-1/2">
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          isConnectable={isConnectable}
          className="w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-neutral-900 relative transform-none left-0 top-0"
        />
        <span className="text-[9px] text-red-600 dark:text-red-400 font-medium ml-1">
          False
        </span>
      </div>
    </div>
  );
}
