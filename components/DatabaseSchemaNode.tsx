"use client";

import React from "react";
import { Position, Handle } from "@xyflow/react";

import type { Field } from "@/types/schema-types";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table2,
  Key,
  Fingerprint,
  Circle,
  Diamond,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DatabaseSchemaData = {
  label: string;
  schema: Field[];
  isEditing?: boolean; // ignored for preview
};

type DatabaseSchemaNodeProps = {
  id: string;
  data: DatabaseSchemaData;
};

const DatabaseSchemaNode: React.FC<DatabaseSchemaNodeProps> = ({ data }) => {
  const renderFieldIndicators = (field: Field) => {
    const indicators: React.ReactNode[] = [];

    if (field.name === "_id") {
      indicators.push(
        <Tooltip key="pk">
          <TooltipTrigger asChild>
            <Key className="size-3 text-amber-500" />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Primary Key
          </TooltipContent>
        </Tooltip>
      );
    }

    if (field.unique) {
      indicators.push(
        <Tooltip key="unique">
          <TooltipTrigger asChild>
            <Fingerprint className="size-3 text-purple-500" />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Unique
          </TooltipContent>
        </Tooltip>
      );
    }

    if (field.required) {
      indicators.push(
        <Tooltip key="required">
          <TooltipTrigger asChild>
            <Diamond className="size-3 text-neutral-700 dark:text-neutral-100 dark:fill-neutral-100 fill-neutral-700" />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Required
          </TooltipContent>
        </Tooltip>
      );
    } else if (field.name !== "_id") {
      indicators.push(
        <Tooltip key="nullable">
          <TooltipTrigger asChild>
            <Circle className="size-3 text-neutral-400 dark:text-neutral-500" />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Nullable
          </TooltipContent>
        </Tooltip>
      );
    }

    if (
      field.type === "objectId" ||
      (field.type === "array" && field.arrayItemType === "objectId")
    ) {
      indicators.push(
        <Tooltip key="ref">
          <TooltipTrigger asChild>
            <ExternalLink className="size-3 text-sky-500" />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Reference
          </TooltipContent>
        </Tooltip>
      );
    }

    return indicators.length > 0 ? (
      <div className="flex items-center gap-0.5">{indicators}</div>
    ) : null;
  };

  return (
    <div
      className={cn(
        "min-w-72 rounded-lg border shadow-sm relative",
        "bg-neutral-50 border-neutral-200",
        "dark:bg-neutral-900 dark:border-neutral-800"
      )}
      style={{ pointerEvents: "all" }}
    >
      {/* Header */}
      <div
        className={cn(
          "px-3 py-2.5 flex flex-row items-center justify-between rounded-t-lg border-b",
          "bg-neutral-50 border-neutral-200",
          "dark:bg-neutral-900/80 dark:border-neutral-800"
        )}
      >
        <div className="flex items-center gap-2">
          <Table2 className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          <span className="text-sm font-semibold px-2 py-0.5 rounded text-neutral-900 dark:text-neutral-50">
            {data.label}
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="py-1">
        {data.schema.length === 0 ? (
          <p className="px-3 py-3 text-sm text-muted-foreground italic text-center">
            No fields defined
          </p>
        ) : (
          data.schema.map((field) => {
            // 👇 ONLY use handleType flags. No extra magic.
            const hasTargetHandle =
              field.handleType === "target" || field.handleType === "both";

            const hasSourceHandle =
              field.handleType === "source" || field.handleType === "both";

            return (
              <div
                key={field.id}
                className={cn(
                  "group relative px-3 py-1.5 transition-colors",
                  "hover:bg-neutral-100",
                  "dark:hover:bg-neutral-800"
                )}
              >
                {hasTargetHandle && (
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={`tgt-${field.id}`}
                    className="!w-2.5 !h-2.5 !bg-sky-500 !border-2 !border-white dark:!border-neutral-900"
                  />
                )}

                <div className="flex items-center gap-2">
                  {/* Indicators */}
                  <div className="w-12 flex items-center justify-start gap-0.5 shrink-0">
                    {renderFieldIndicators(field)}
                  </div>

                  {/* Field Name */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={cn(
                        "text-xs font-mono truncate",
                        field.name === "_id"
                          ? "text-neutral-700 dark:text-neutral-200"
                          : "text-neutral-900 dark:text-neutral-100"
                      )}
                    >
                      {field.name}
                    </span>
                  </div>

                  {/* Field Type */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs text-muted-foreground font-mono">
                      {field.type}
                      {field.type === "array" && field.arrayItemType
                        ? `<${field.arrayItemType}>`
                        : ""}
                    </span>
                  </div>
                </div>

                {hasSourceHandle && (
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`src-${field.id}`}
                    className="!w-2.5 !h-2.5 !bg-emerald-500 !border-2 !border-white dark:!border-neutral-900"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default React.memo(DatabaseSchemaNode);
