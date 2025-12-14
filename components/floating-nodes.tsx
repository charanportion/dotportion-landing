"use client";

import { motion } from "framer-motion";
import { ReactFlowProvider } from "@xyflow/react";
import { APIStartNode } from "./nodes/api-start-node";
import MongoDbNode from "./nodes/mongodb-node";
import { ConditionNode } from "./nodes/condition-node";
import { ResponseNode } from "./nodes/response-node";

const floatTransition = {
  duration: 6,
  repeat: Infinity,
  repeatType: "mirror" as const,
};

export default function FloatingNodes() {
  return (
    <ReactFlowProvider>
      <div className="pointer-events-none absolute inset-0 max-w-5xl mx-auto">
        {/* Floating Parameter Node */}
        <motion.div
          className="hidden md:block absolute -left-28 top-64 -rotate-6"
          initial={{ y: 10 }}
          animate={{ y: [-10, 10, -10] }}
          transition={floatTransition}
        >
          <APIStartNode
            id="floating-param-node"
            selected={false}
            isConnectable={false}
            data={{
              label: "API Endpoint",
              method: "POST",
              path: "/update-user",
              description: "Entry point for the API",
            }}
          />
        </motion.div>

        {/* Floating Mongo Node */}
        <motion.div
          className="hidden lg:block absolute -right-24 top-64 rotate-6"
          initial={{ y: -10 }}
          animate={{ y: [5, -10, 5] }}
          transition={{ ...floatTransition, duration: 7.5 }}
        >
          <MongoDbNode
            id="floating-mongo-node"
            selected={false}
            isConnectable={false}
            data={{
              label: "MongoDB",
              collection: "users",
              provider: "mongodb",
              operation: "findOne",
            }}
          />
        </motion.div>

        {/* Floating Condition Node */}
        <motion.div
          className="hidden md:block absolute left-20 scale-75 -translate-x-1/2 bottom-10 -rotate-3 opacity-55 z-10"
          initial={{ y: 15 }}
          animate={{ y: [-5, 10, -5] }}
          transition={{ ...floatTransition, duration: 8.5 }}
        >
          <ConditionNode
            id="floating-condition-node"
            selected={false}
            isConnectable={false}
            data={{
              label: "Condition",
              condition: "{{user.isActive}} === true",
            }}
          />
        </motion.div>
        <motion.div
          className="hidden md:block absolute -right-20 scale-75 -translate-x-1/2 bottom-10 rotate-3 opacity-55 z-10"
          initial={{ y: 15 }}
          animate={{ y: [-5, 10, -5] }}
          transition={{ ...floatTransition, duration: 8.5 }}
        >
          <ResponseNode
            id="floating-condition-node"
            selected={false}
            isConnectable={false}
            data={{
              label: "API Response",
              statusCode: 200,
              responseType: "application/json",
              responseBody: '{\n  "success": true\n}',
              description: "Send response to client",
              output: {
                success: true,
              },
            }}
          />
        </motion.div>
      </div>
    </ReactFlowProvider>
  );
}
