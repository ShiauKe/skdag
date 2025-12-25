export function injectExternalInputs(cloneRepo, externalInputs) {
  for (const [nodeId, values] of Object.entries(externalInputs)) {
    const clone = cloneRepo.get(nodeId);
    if (!clone) {
      throw new Error(`Cannot inject: node ${nodeId} not found`);
    }

    for (const [port, value] of Object.entries(values)) {
      clone.input[port] = value;
    }
  }
}
