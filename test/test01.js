import {k} from "../src/k/index.js";


k.createNodePrototype("add", {
  input: { a: "number", b: "number" },
  output: { sum: "number" },
  handler({ a, b }) {
    return { sum: a + b };
  }
});


try {
  k.createNodePrototype("add", {
    input: {},
    output: {},
    handler() {}
  });
} catch (e) {
  console.log(e.message);
}
