import { s } from "./src/s/index.js";
import { createGraph } from "./src/s/graph.js";

/* 1. 告訴系統：有哪些步驟可以用 */
s.step("add", {
  run({ a, b }) {
    return { sum: a + b };
  }
});

s.step("double", {
  run({ x }) {
    return { value: x * 2 };
  }
});

/* 2. 排流程（Shell Graph） */
const graph = createGraph()
  .addNode("n1", "add")
  .addNode("n2", "double")
  .addEdge("n1", "n2");

/* 3. 建立並執行一次流程 */
const flow = s.build(graph, {
  n1: { a: 2, b: 3 },
  n2: { x: 10 }
});

const result = await s.run(flow);

console.log(result.outputs);
