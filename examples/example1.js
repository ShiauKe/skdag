import skdag from "../index.js";
console.log("=== Test Case 1: Simple Add and Minus ===");

const Adder = {
  name: "Adder",
  spec:{
    input: [{ name: "a",type:"number" }, { name: "b",type:"number" }],
    output: [{ name: "sum",type:"number" }],
    handler: (input, output) => {
      output.sum = input.a + input.b;
    }
  }
}
const minus = {
  name: "Minus",
  spec: {
    input: [{ name: "a",type:"number" }, { name: "b",type:"number" }],
    output: [{ name: "difference",type:"number" }],
    handler: (input, output) => {
      output.difference = input.a - input.b;
    }
  }
}


const graph = {
  nodes: [
    { nodeId:"node1",name: "Adder" },
    { nodeId:"node2", name: "Minus" }
  ],
  edges:[
    { direction:["node1","node2"],
      links:[
        ["sum","a"]
      ]
    }
  ]
}

const externalInputs={
        node1: { a: 3, b: 2 },
        node2: { b: 4 }
}

skdag.registerPrototypeNode(Adder);
skdag.registerPrototypeNode(minus);


const dagCollector = await skdag.run(graph, externalInputs);
console.log('node1:', dagCollector.get('node1')._outputBoxes);
console.log('node2:', dagCollector.get('node2')._outputBoxes);