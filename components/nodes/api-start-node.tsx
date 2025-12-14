import { Handle, Position } from "@xyflow/react";
import { Globe } from "lucide-react";
import type { NodeData } from "@/types/node-types";

export function APIStartNode({
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
  return (
    <div
      className={`rounded-md border w-[200px] overflow-hidden
        bg-white dark:bg-neutral-800
        ${
          selected
            ? "border-blue-500 ring-1 ring-blue-500"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-2 px-2.5 py-2 border-b
          border-neutral-200 dark:border-neutral-700
          bg-neutral-50 dark:bg-neutral-900/80
        "
      >
        <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
          <Globe className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate">
            {data.label || "API Endpoint"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 py-2 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded
              ${
                data.method === "GET"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                  : data.method === "POST"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                  : data.method === "PUT"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                  : data.method === "DELETE"
                  ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                  : "bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
              }`}
          >
            {data.method || "GET"}
          </span>
          <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-300 truncate">
            {data.path || "/api"}
          </span>
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
        className="
          w-2.5 h-2.5
          bg-blue-500
          border-2
          border-white dark:border-neutral-900
        "
      />
    </div>
  );
}
