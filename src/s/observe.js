export function printGraph(graph) {
  console.log("\nGraph Geometry\n");

  const nodeMap = new Map(
    graph.nodes.map(n => [n.nodeId, n.name])
  );

  for (const node of graph.nodes) {
    console.log(`[${node.nodeId}] ${node.name}`);
    
    const outgoing = graph.edges.filter(
      e => e.direction[0] === node.nodeId
    );

    for (const edge of outgoing) {
      const [, to] = edge.direction;
      for (const [fromPort, toPort] of edge.links) {
        console.log(`   │`);
        console.log(`   └─ output [${fromPort}] ──▶ as input [${toPort}] for`);
        console.log(`               │`);
        console.log(`           [${to}] ${nodeMap.get(to)}`);
      }
    }

    console.log(""); // spacing
  }
}


function getChildren(graph, nodeId) {
  const children = new Set();

  for (const edge of graph.edges) {
    const [from, to] = edge.direction;
    if (from === nodeId) {
      children.add(to);
    }
  }

  return [...children];
}


function getParents(graph, nodeId) {
  const parents = new Set();

  for (const edge of graph.edges) {
    const [from, to] = edge.direction;
    if (to === nodeId) {
      parents.add(from);
    }
  }

  return [...parents];
}

export function printNeighborhood(graph, nodeId) {
  const nodeMap = new Map(
    graph.nodes.map(n => [n.nodeId, n.name])
  );

  if (!nodeMap.has(nodeId)) {
    console.log(`Node "${nodeId}" not found`);
    return;
  }

  const parents = getParents(graph, nodeId);
  const children = getChildren(graph, nodeId);

  console.log(`\nLooking for Node: ${nodeId} (${nodeMap.get(nodeId)})\n`);

  console.log("Parents:");
  if (parents.length === 0) {
    console.log("  (none)");
  } else {
    for (const p of parents) {
      console.log(`  └─ ${p} (${nodeMap.get(p)})`);
    }
  }

  console.log("\nChildren:");
  if (children.length === 0) {
    console.log("  (none)");
  } else {
    for (const c of children) {
      console.log(`  └─ ${c} (${nodeMap.get(c)})`);
    }
  }

  console.log("");
}

