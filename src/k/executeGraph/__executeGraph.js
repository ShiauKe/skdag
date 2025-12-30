
export async function execGraph(topoOrder, cloneRepo) {
  for (const nodeId of topoOrder) {
    const clone = cloneRepo.get(nodeId);

    if (!clone) {
      throw new Error(`Clone not found for nodeId: ${nodeId}`);
    }

    // handler 只負責：
    // - 讀 input
    // - 寫 output
    await clone.handler(clone.input, clone.output);
  }
}
