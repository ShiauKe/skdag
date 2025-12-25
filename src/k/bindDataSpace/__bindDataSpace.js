export function bindDataSpace(graph, cloneRepo) {
    for (const edge of graph.edges) {
        const [fromNode, toNode] = edge.direction;
        const fromClone = cloneRepo.get(fromNode);
        const toClone = cloneRepo.get(toNode);
        for (const [fromPort, toPort] of edge.links) {
            // 🔑 關鍵：shared reference
            // input 與 output 已經在clone的時候建立好了
            // 這裡只是把兩個 node 的 input/output 連結起來 
            // 建立在cloneRepo上的shared reference
            toClone._inputBoxes[toPort] = fromClone._outputBoxes[fromPort];
            console.log(`Binding data space: ${fromNode}.${fromPort} -> ${toNode}.${toPort}`);
        }
    }
}
