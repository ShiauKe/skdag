/**
 * Execute a Kernel Instance
 * Execution is strictly Kernel-only.
 */
export async function run({ instance, ctx = {}, getPrototype }) {
  if (!instance || instance.kind !== "KernelInstance") {
    throw new Error("run(): invalid instance");
  }

  const {
    nodes,
    order,
    inputsByNodeId,
    outputs
  } = instance;

  for (const nodeId of order) {
    const node = nodes.get(nodeId);
    if (!node) {
      throw new Error(`run(): missing node ${nodeId}`);
    }

    const prototype = getPrototype(node.prototype);

    const input = inputsByNodeId[nodeId] ?? {};
    const localCtx = {
      ...ctx,
      nodeId,
      config: node.config,
      outputs
    };

    let result;
    try {
      result = await prototype.run(input, localCtx);
    } catch (err) {
      throw new Error(
        `Node "${nodeId}" (prototype "${node.prototype}") failed: ${err.message}`
      );
    }

    outputs[nodeId] = result;
  }

  return Object.freeze({
    outputs
  });
}
