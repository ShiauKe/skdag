/**
 * Shell Graph Blueprint
 * Users can only describe structure here.
 * No behavior, no execution.
 */

export function createGraph() {
  const nodes = new Map(); // nodeId -> { id, prototype, config }
  const edges = [];       // { from, to }

  return Object.freeze({
    /**
     * Add a node by referencing a Kernel prototype
     */
    addNode(nodeId, prototypeName, config = {}) {
      if (!nodeId || !prototypeName) {
        throw new Error("addNode(): nodeId and prototypeName are required");
      }
      if (nodes.has(nodeId)) {
        throw new Error(`addNode(): duplicate nodeId "${nodeId}"`);
      }
      if (typeof config !== "object") {
        throw new Error(`addNode(): config must be an object`);
      }

      nodes.set(nodeId, {
        id: nodeId,
        prototype: prototypeName,
        config: structuredClone(config)
      });

      return this; // chainable
    },

    /**
     * Add a directed edge (dependency)
     */
    addEdge(from, to) {
      if (!nodes.has(from)) {
        throw new Error(`addEdge(): unknown from-node "${from}"`);
      }
      if (!nodes.has(to)) {
        throw new Error(`addEdge(): unknown to-node "${to}"`);
      }

      edges.push({ from, to });
      return this; // chainable
    },

    /**
     * Export blueprint as pure data
     * Kernel will validate and instantiate it.
     */
    toJSON() {
      return {
        nodes: Array.from(nodes.values()),
        edges: edges.slice()
      };
    }
  });
}
