import {s} from "../src/s/index.js";    


s.registerPrototypeNode("add", {
  input: { a: "number", b: "number" },
  output: { sum: "number" },
  handler({ a, b }) {
    return { sum: a + b };
  }
});


console.log(s.getProtoTypeRepo())


const g = {
  nodes: [
    { id: "n1", type: "add", inject:["a","b"], probe:["sum"] },
    { id: "n2", type: "add", inject:["b"], probe:["sum"] }
  ],
  edges: [
    {
      direction: [
        "n1", "n2"
],
      links:[
        ["sum","a"]
      ]
    }
  ]
};

const externalInputs = {
  n1: { a: 2, b: 3 },
  n2: { b: 5 }
};

await s.runDag(g, externalInputs)