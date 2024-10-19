"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
export default function Home() {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="min-h-[calc(100vh-3rem-1px)] w-full flex ">
      <ResizablePanelGroup direction="horizontal" className="h-full ">
        <ResizablePanel defaultSize={55}>
          <div
            style={{ width: "100%", height: "calc(100vh - 3rem - 1px)" }}
            className="p-1"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
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
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
