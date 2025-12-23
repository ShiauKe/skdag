
// k = kernel = dag的核心（註冊原型, 實例化, 執行）
import { createNodePrototype } from "./prototypeNode/__createNodeProtoType.js";
import { getNodePrototype } from "./prototypeNode/__getNodeProtoType.js";
import { prototypeNodeRepo } from "./prototypeNode/repo/__prototypeNodesRepo.js";
import { cloneNodeFromPrototypeRepo } from "./cloneNode/__cloneNode.js";
import { getNodeCloneRepo } from "./cloneNode/__getNodeClone.js";
import { topoSortByEdges } from "./topoSort/__topoSortByEdges.js";
// import { instantiate } from "./instantiate.js";
// import { run } from "./run.js";

export const k = Object.freeze({
        prototypeNodeRepo,
        createNodePrototype,
        getNodePrototype,
        cloneNodeFromPrototypeRepo,
        getNodeCloneRepo,
        topoSortByEdges
//   instantiate,
//   run
});
