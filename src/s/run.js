import { k } from "../k/index.js";

export async function run(graph, externalInputs) {
        // 1. 拓撲排序
        const topo = k.topoSortByEdges(graph)
        // 2. 從 prototype repo 複製 node 到 clone repo
        k.cloneNodeFromPrototypeRepo(graph)
        // 3. 注入 external inputs
        k.injectExternalInputs(k.getNodeCloneRepo(),externalInputs);
        // 4. 綁定 data space
        k.bindDataSpace(graph, k.getNodeCloneRepo());
        // 5. 執行 graph
        await k.execGraph(topo,k.getNodeCloneRepo());
        // 回傳 clone repo
        return k.getNodeCloneRepo();
}       