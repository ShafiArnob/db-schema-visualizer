export const getNodesAndEdges = ({ models, connections }) => {
  let row = 0;
  let column = 0;
  const numModels = models.length;
  let numGrid = 1;

  while (1) {
    if (numGrid ** 2 >= numModels) {
      break;
    }
    numGrid++;
  }

  const nodes = models.map((model, index) => {
    const x = row * 300;
    const y = column * 300;

    if (numGrid % index === 0) {
      column = 0;
      row += 1;
    } else {
      column += 1;
    }

    return {
      id: model.name,
      position: { x: x, y: y },
      data: model,
      type: "model",
    };
  });

  // const nodes: Node[] = [
  //   {
  //     id: "2",
  //     data: {
  //       label: "Node 2",
  //     },
  //     position: { x: 200, y: 0 },
  //   },
  // ];

  const edges = connections.map((connection) => {
    const sourceId = `${connection.source}-${connection.name}`;
    return {
      id: sourceId,
      source: connection.source,
      target: connection.target,
      sourceHandle: sourceId,
      targetHandle: connection.target,
      animated: true,
      type: "smoothstep",
    };
  });

  return { nodes, edges };
};

export const getInfoFromSchema = (schema) => {
  const modelStrings = Array.from(
    schema.matchAll(/model \w+{[\w\s:;\[\]]+}/g)
  ).map((i) => i[0]);

  // console.log(modelStrings);

  const modelNames = modelStrings.map((modelString) => {
    return Array.from(modelString.matchAll(/model (\w+)/g))?.[0]?.[1];
  });

  // console.log(modelNames);

  const parsedModels = modelStrings.map((modelString, index) => {
    return {
      name: modelNames[index],
      fields: Array.from(modelString.matchAll(/(\w+): (\w+)/g)).map((field) => {
        const name = field?.[1];
        const type = field?.[2];
        return {
          name,
          type,
          hasConnections: !!modelNames?.find((modelName) =>
            type?.includes(modelName)
          ),
        };
      }),
    };
  });

  const connections = [];
  parsedModels.forEach((model) => {
    model.fields.forEach((field) => {
      const connection = modelNames?.find((modelname) =>
        field?.type?.includes(modelname)
      );
      // console.log(connection);

      if (connection) {
        connections.push({
          target: connection,
          source: model.name,
          name: field.name,
        });
      }
    });
  });

  return {
    models: parsedModels.map((model) => ({
      ...model,
      isChild: parsedModels.some((parsedModel) =>
        parsedModel.fields.find((field) => field.type?.includes(model.name))
      ),
    })),
    connections: connections,
  };
};
