import { Handle, Position } from "@xyflow/react";
import { Code } from "lucide-react";
import type { NodeData } from "@/types/node-types";

export function LogicNode({
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
  const codePreview = data.code
    ? data.code.split("\n")[0].substring(0, 25) +
      (data.code.length > 25 ? "..." : "")
    : "No code";

  return (
    <div
      className={`rounded-md border w-[200px] overflow-hidden
        bg-white dark:bg-neutral-800
        ${
          selected
            ? "border-purple-500 ring-1 ring-purple-500"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 bg-purple-500 border-2 border-white dark:border-neutral-900"
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-purple-50 dark:bg-purple-500/10">
        <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
          <Code className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate">
            {data.label || "Logic"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 py-2 space-y-1.5">
        <div className="bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-1">
          <code className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono block truncate">
            {codePreview}
          </code>
        </div>

        {data.description && (
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
            {data.description}
          </p>
        )}

        <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">
          {id}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 bg-purple-500 border-2 border-white dark:border-neutral-900"
      />
    </div>
  );
}
