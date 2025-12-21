const prototypes = new Map();

/**
 * Define and register an immutable prototype definition.
 *
 * A prototype represents the kernel-level definition of a node:
 * - `run` defines executable behavior
 * - `inputSchema` / `outputSchema` define the I/O contract
 *
 * Once defined, a prototype is frozen and must not be mutated.
 * All runtime state must live in cloned instances, not in prototypes.
 *
 * @param {string} name
 *   Unique identifier of the prototype.
 *
 * @param {Object} spec
 *   Prototype specification object.
 *
 * @param {Function} spec.run
 *   Execution function of the prototype.
 *
 * @param {Object} [spec.inputSchema]
 *   Optional input schema describing expected inputs.
 *
 * @param {Object} [spec.outputSchema]
 *   Optional output schema describing produced outputs.
 *
 * @throws {Error}
 *   Thrown if a prototype with the same name is already defined.
 *
 * @throws {Error}
 *   Thrown if `spec.run` is missing or not a function.
 */
export function definePrototype(name, spec) {
  if (prototypes.has(name)) {
    throw new Error(`Prototype already defined: ${name}`);
  }
  if (!spec || typeof spec.run !== "function") {
    throw new Error(`Prototype ${name} must define run()`);
  }

  prototypes.set(name, Object.freeze({
    name,
    run: spec.run,
    inputSchema: spec.inputSchema,
    outputSchema: spec.outputSchema
  }));
}

export function getPrototype(name) {
  const p = prototypes.get(name);
  if (!p) throw new Error(`Unknown prototype: ${name}`);
  return p;
}
