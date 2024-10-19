import { Handle, Position } from "@xyflow/react";

export default function ModelNode({ data }) {
  return (
    <div className="rounded-lg min-w-60">
      {data.isChild && (
        <Handle id={data.name} position={Position.Top} type="target" />
      )}
      <div className="p-1 text-center rounded-t-lg rounded-b-none bg-[#3d5787]">
        <span className="font-bold text-white">
          <pre>{data.name}</pre>
        </span>
      </div>
      {data.fields.map(({ type, name, hasConnections }, index) => (
        <div
          key={index}
          className="flex justify-between p-1 text-white even:bg-[#282828] odd:bg-[#232323]"
        >
          <span>
            <pre>{name}</pre>
          </span>
          <span>
            <pre>{type}</pre>
          </span>
          {hasConnections && (
            <Handle
              id={`${data.name}-${name}`}
              type="source"
              position={Position.Right}
              style={{ top: 32 + 16 + 32 * index }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
