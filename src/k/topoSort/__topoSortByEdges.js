export function topoSortByEdges(graph) {
        // kahn's algorithm
        // Kahn = 維護 in-degree，反覆取出 in-degree=0 的 nodes
        // ，並將它們的 children 的 in-degree 減一
        const { nodes, edges } = graph;

        // nodeId -> inDegree
        const inDegree = new Map();
        // nodeId -> [children]
        const adj = new Map();

        // 初始化每個node的in-degree和adjacency list
        // 初始狀態每個node的in-degree，並且不存在任何鄰接節點
        for (const { nodeId } of nodes) {
                inDegree.set(nodeId, 0);
                adj.set(nodeId, []);
        }

        // 根據edges資訊更新每個node的in-degree和鄰接節點資訊供後續使用
        for (const edge of edges) {
                const from = edge.direction[0];;
                const to = edge.direction[1];
                adj.get(from).push(to);
                inDegree.set(to, inDegree.get(to) + 1);
        }

        // 根據入度map, 找出所有入度為0的節點，並加入處理佇列queue
        const ready = [];
        for (const [id, deg] of inDegree) {
                if (deg === 0) ready.push(id);
        }

        // 開始進行拓撲排序, 不斷從ready佇列取出入度為0的節點, 
        // 並將其加入topoSortOrder
        const topoSortOrdeer = [];
        while (ready.length) {
                const id = ready.shift();
                topoSortOrdeer.push(id);

                for (const next of adj.get(id)) {
                        inDegree.set(next, inDegree.get(next) - 1);
                        if (inDegree.get(next) === 0) ready.push(next);
                }
        }

        // 如果排序結果的長度不等於節點數量，表示圖中存在循環依賴
        if (topoSortOrdeer.length !== nodes.length) {
                throw new Error("cycle detected");
        }

        return topoSortOrdeer; // e.g. ["add1", "add2"]
}

                            
