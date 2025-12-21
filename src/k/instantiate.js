/**
 * Instantiate a Shell Graph into a runnable Instance
 * This is the climbing gate of the system.
 */
export function instantiate({ graph, inputsByNodeId = {}, getPrototype }) {
  if (!graph || typeof graph !== "object") {
    throw new Error("instantiate(): graph is required");
  }

  const { nodes, edges } = graph.toJSON();

  // --- 1. 基本結構檢查 ---
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    throw new Error("Invalid graph format");
  }

  const nodeMap = new Map();
  for (const node of nodes) {
    if (!node.id || !node.prototype) {
      throw new Error(`Invalid node definition: ${JSON.stringify(node)}`);
    }
    if (nodeMap.has(node.id)) {
      throw new Error(`Duplicate node id: ${node.id}`);
    }

    // Prototype must exist (Kernel authority)
    getPrototype(node.prototype);

    nodeMap.set(node.id, {
      id: node.id,
      prototype: node.prototype,
      config: structuredClone(node.config ?? {})
    });
  }

  // --- 2. Edge 檢查 ---
  for (const edge of edges) {
    if (!nodeMap.has(edge.from) || !nodeMap.has(edge.to)) {
      throw new Error(`Invalid edge: ${edge.from} -> ${edge.to}`);
    }
  }

  // --- 3. DAG（Topo Sort） ---
  const order = topoSort(nodes, edges);

  // --- 4. 建立 Instance ---
  const instance = Object.freeze({
    kind: "KernelInstance",
    nodes: nodeMap,
    edges: structuredClone(edges),
    order,
    inputsByNodeId: structuredClone(inputsByNodeId),
    outputs: {}
  });

  return instance;
}

/* ------------------------ */
/* Internal helpers only    */
/* ------------------------ */

function topoSort(nodes, edges) {
  const indeg = new Map();
  const out = new Map();

  for (const n of nodes) {
    indeg.set(n.id, 0);
    out.set(n.id, []);
  }

  for (const e of edges) {
    indeg.set(e.to, indeg.get(e.to) + 1);
    out.get(e.from).push(e.to);
  }

  const q = [];
  for (const [id, d] of indeg.entries()) {
    if (d === 0) q.push(id);
  }

  const order = [];
  while (q.length) {
    const id = q.shift();
    order.push(id);
    for (const nxt of out.get(id)) {
      indeg.set(nxt, indeg.get(nxt) - 1);
      if (indeg.get(nxt) === 0) q.push(nxt);
    }
  }

  if (order.length !== nodes.length) {
    throw new Error("Graph is not a DAG (cycle detected)");
  }

  return order;
}
