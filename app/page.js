"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import ModelNode from "./components/ModelNode";
import { getInfoFromSchema, getNodesAndEdges } from "./utils/utils";
import {} from "./utils/constant";

const modelTypes = {
  model: ModelNode,
};

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [inputSchema, setInputSchema] = useState("");

  useEffect(() => {
    const { models, connections } = getInfoFromSchema(inputSchema);
    const { nodes, edges } = getNodesAndEdges({ models, connections });
    setNodes(nodes);
    setEdges(edges);
  }, [inputSchema]);

  return (
    <div className="min-h-[calc(100vh-3rem-1px)] w-full flex ">
      <ResizablePanelGroup direction="horizontal" className="h-full ">
        <ResizablePanel defaultSize={65}>
          <div
            style={{ width: "100%", height: "calc(100vh - 3rem - 1px)" }}
            className="p-1"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              // onConnect={onConnect}
              nodeTypes={modelTypes}
              fitView
              fitViewOptions={{ padding: 2 }}
              colorMode="dark"
            >
              <MiniMap />
              <Background
                // gap={20}
                // size={1}
                color="#222"
                variant={BackgroundVariant.Lines}
              />
              <Controls />
            </ReactFlow>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={30} maxSize={50}>
          <div className="min-h-[calc(100vh-3rem-1px)] p-4">
            <div className="mb-4">
              <h3 className="text-zinc-400">
                Entity Relationship Visualize Model
              </h3>
            </div>
            <div className="h-[10rem] ">
              <Textarea
                placeholder="Type your message here."
                className="min-h-full"
                style={{ resize: "none" }}
                rows="20"
                value={inputSchema}
                onChange={(e) => setInputSchema(e.target.value)}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
