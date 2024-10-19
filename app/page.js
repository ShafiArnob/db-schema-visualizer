import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export default function Home() {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  return (
    <div className="min-h-[calc(100vh-3rem-1px)] w-full flex ">
      <ResizablePanelGroup direction="horizontal" className="h-full ">
        <ResizablePanel defaultSize={55}>
          <div className="min-h-[calc(100vh-3rem-1px)]">
            <div style={{ width: "100%", height: "calc(100vh - 3rem - 1px)" }}>
              <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                colorMode="dark"
              >
                <MiniMap />
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <div className="min-h-[calc(100vh-3rem-1px)] p-4">
            <div className="mb-4">
              <h3>Entity Relationship Visualize Model</h3>
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
