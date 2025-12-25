import { k } from "../k/index.js";
import { topoSortByEdges } from "../k/topoSort/__topoSortByEdges.js";
import { printGraph, printNeighborhood } from "./observe.js";
/**
 * Shell API
 * This is the only surface users should touch.
 */
export const s = Object.freeze({
  /**
   * Register a step that can be used in a flow
   */
  getProtoTypeRepo(){return k.prototypeNodeRepo},
  registerPrototypeNode(name, spec) {
    return k.createNodePrototype(name, spec);
  },
  getNodeCloneRepo(){return k.getNodeCloneRepo()},
  topoSortByEdges(graph){return k.topoSortByEdges(graph)},
  printGraph(graph){return printGraph(graph)},
  printNeighborhood(graph, nodeId){return printNeighborhood(graph, nodeId)},
});
