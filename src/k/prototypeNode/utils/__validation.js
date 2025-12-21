import {prototypeNodeRepo} from "../repo/__prototypeNodesRepo.js";

export function guardName(name) {
  if (typeof name !== "string" || !name) {
    throw new Error("createNodePrototype: name must be a non-empty string");
  }
}

export function guardSpec(spec) {
  // spec 必須是物件，且包含 input, handler, output
  if (!spec || typeof spec !== "object") {
    throw new Error("createNodePrototype: spec must be an object");
  }

  const { input, handler, output } = spec;


  // 處理input schema
if (!Array.isArray(input)) {
  throw new Error(
    "createNodePrototype: input must be an array of input specs"
  );
}
const inputNames = new Set();
for (const spec of input) {
  if (typeof spec !== "object" || spec === null) {
    throw new Error("[guard] each input spec must be an object");
  }

  if (typeof spec.name !== "string" || spec.name.length === 0) {
    throw new Error("[guard] input spec.name must be a non-empty string");
  }

  if (typeof spec.type !== "string") {
    throw new Error(
      `[guard] input.${spec.name}.type must be a type descriptor string`
    );
  }

  if (
    spec.comment !== undefined &&
    typeof spec.comment !== "string"
  ) {
    throw new Error(
      `[guard] input.${spec.name}.comment must be a string`
    );
  }

  if (
    spec.required !== undefined &&
    typeof spec.required !== "boolean"
  ) {
    throw new Error(
      `[guard] input.${spec.name}.required must be boolean`
    );
  }
  if (inputNames.has(spec.name)) {
    throw new Error(
      `[guard] duplicate input name: ${spec.name}`
    );
  }
  inputNames.add(spec.name);
}


  // 處理output schema
if (!Array.isArray(output)) {
  throw new Error(
    "createNodePrototype: output must be an array of output specs"
  );
}

const outputNames = new Set();
for (const spec of output) {
  if (typeof spec !== "object" || spec === null) {
    throw new Error("[guard] each output spec must be an object");
  }

  if (typeof spec.name !== "string" || spec.name.length === 0) {
    throw new Error("[guard] output spec.name must be a non-empty string");
  }

  if (typeof spec.type !== "string") {
    throw new Error(
      `[guard] output.${spec.name}.type must be a type descriptor string`
    );
  }

  if (
    spec.comment !== undefined &&
    typeof spec.comment !== "string"
  ) {
    throw new Error(
      `[guard] output.${spec.name}.comment must be a string`
    );
  }

  if (
    spec.required !== undefined &&
    typeof spec.required !== "boolean"
  ) {
    throw new Error(
      `[guard] output.${spec.name}.required must be boolean`
    );
  }
  if (outputNames.has(spec.name)) {
    throw new Error(
      `[guard] duplicate output name: ${spec.name}`
    );
  }
  outputNames.add(spec.name);
}





  // 處理handler 
  if (typeof handler !== "function") {
    throw new Error("createNodePrototype: handler must be a function");
  }
}
