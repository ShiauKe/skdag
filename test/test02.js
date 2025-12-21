import {s} from "../src/s/index.js";    


s.registerPrototypeNode("add", {
  input: [{ name: "a", type: "number" }, { name: "b", type: "number" }],
  output: [{ name: "sum", type: "number" }],
  handler({ a, b }) {
    return { sum: a + b };
  }
});


console.log(s.getProtoTypeRepo())