import { definePrototype, getPrototype } from "./prototypeRegistry.js";
import { instantiate } from "./instantiate.js";
import { run } from "./run.js";

/**
 * Kernel is the only authority of:
 * - defining behavior
 * - validating structure
 * - executing instances
 */
export const k = Object.freeze({
  /**
   * Define a behavior prototype (Kernel-only)
   */
  definePrototype,

  /**
   * Instantiate a Shell Graph into a runnable instance
   */
  instantiate(graph, inputsByNodeId) {
    return instantiate({
      graph,
      inputsByNodeId,
      getPrototype
    });
  },

  /**
   * Run an instance (Kernel-only execution)
   */
  async run(instance, ctx = {}) {
    return run({
      instance,
      ctx,
      getPrototype
    });
  }
});
