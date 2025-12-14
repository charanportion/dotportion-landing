import type { NodeData } from "@/types/node-types";
import { Handle, Position } from "@xyflow/react";
import { KeyRound } from "lucide-react";

export default function JwtGenerateNode({
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
  const payloadKeys = data.payload ? Object.keys(data.payload).length : 0;

  return (
    <div
      className={`rounded-md border w-[200px] overflow-hidden
        bg-white dark:bg-neutral-800
        ${
          selected
            ? "border-indigo-500 ring-1 ring-indigo-500"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 bg-indigo-500 border-2 border-white dark:border-neutral-900"
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-indigo-50 dark:bg-indigo-500/10">
        <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
          <KeyRound className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate">
            {data.label || "JWT Generate"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 py-2 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            Expires:
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 rounded">
            {data.expiresIn || "1h"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            Payload fields:
          </span>
          <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-200">
            {payloadKeys}
          </span>
        </div>

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
        className="w-2.5 h-2.5 bg-indigo-500 border-2 border-white dark:border-neutral-900"
      />
    </div>
  );
}
