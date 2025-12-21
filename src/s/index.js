import { k } from "../k/index.js";

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

  /**
   * Build a runnable flow from a graph
   */
//   build(graph, inputs) {
//     return k.instantiate(graph, inputs);
//   },

  /**
   * Execute a built flow
   */
//   run(instance, ctx) {
//     return k.run(instance, ctx);
//   }
});
