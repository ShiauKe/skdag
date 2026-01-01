import skdag from "../index.js";
console.log("=== Test Case 2: async/await handler ===");

const n1 = {
  name: "await1",
  spec:{
    input: [{ name: "a",type:"number" }],
    output: [{ name: "result",type:"string" }],
    handler: async (input, output) => {
      await sleep(input.a);
      output.result = "success";
    }
  }
}

const graph = {
  nodes: [
    { nodeId:"node1",name: "await1" },
  ],
  edges:[
  ]
}

const externalInputs={
        node1: { a: 3000 },
}


skdag.registerPrototypeNode(n1);
const dagCollector = await skdag.run(graph, externalInputs);
console.log('node1:', dagCollector.get('node1')._outputBoxes);

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}
