import { Handle, Position } from "@xyflow/react";
import { Send } from "lucide-react";
import type { NodeData } from "@/types/node-types";

export function ResponseNode({
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
  const statusColor =
    data.status && data.status >= 200 && data.status < 300
      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
      : data.status && data.status >= 400
      ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
      : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";

  return (
    <div
      className={`rounded-md border w-[200px] overflow-hidden
        bg-white dark:bg-neutral-800
        ${
          selected
            ? "border-orange-500 ring-1 ring-orange-500"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        isConnectable={isConnectable}
        className="!w-2.5 !h-2.5 !bg-orange-500 !border-2 !border-white dark:!border-neutral-900"
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-orange-50 dark:bg-orange-500/10">
        <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
          <Send className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate">
            {data.label || "Response"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 py-2 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${statusColor}`}
          >
            {data.status || 200}
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
            {data.responseType || "application/json"}
          </span>
        </div>

        {data.responseBody && (
          <div className="bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-1">
            <code className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono block truncate">
              {data.responseBody.substring(0, 30)}...
            </code>
          </div>
        )}

        <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">
          {id}
        </div>
      </div>
    </div>
  );
}
