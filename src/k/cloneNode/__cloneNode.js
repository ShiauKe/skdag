import {cloneNodesRepo} from "./__cloneNodesRepo.js";
import {getNodePrototype} from "../prototypeNode/__getNodeProtoType.js";


export function cloneNodeFromPrototypeRepo(graph) {
  // 為 graph 裡的每一個 node 建立 clone instance
  // 並存到 cloneNodesRepo 裡
  // clone node 的 id 用 randomUUID 產生
  // clone node 的內容來自 prototype node
  // 包含 input, output 的 runtime storage 物件(將 prototype spec 具現化轉成 runtime 物件)
  for (const node of graph.nodes){
    const proto = getNodePrototype(node.name);
    if (cloneNodesRepo.has(node.nodeId)) {
      throw new Error(`Duplicate nodeId in clone repo: ${node.nodeId}`);
    }
    const inputBoxes  = materializePort(proto.input);
    const outputBoxes = materializePort(proto.output);
    const clone = {
      nodeId: node.nodeId,
      prototypeName: node.name,
      // input: materializePort(proto.input),
      // output: materializePort(proto.output),
      // / 引擎內部用
      _inputBoxes: inputBoxes,
      _outputBoxes: outputBoxes,

      // 使用者 / handler 看到的
      input: createValueView(inputBoxes),
      output: createValueView(outputBoxes),
      handler: proto.handler,
    }
    cloneNodesRepo.set(node.nodeId, clone);
  }
}; 


/**
 * Materialize a port storage object from a prototype port specification.
 *
 * 【用途說明】
 * 將原型（prototype）階段的 port 規格宣告（array）
 * 轉換為 clone（instance）階段可使用的 runtime port 容器（object）。
 *
 * 【設計前提 / 假設】
 * - portSpec 已在 prototype 定義階段完成驗證（guard 過）。
 * - 本函式不負責任何驗證、推論或 runtime 邏輯。
 * - 僅負責「宣告 → 具現」的型態轉換。
 *
 * 【語意分層】
 * - Prototype 層：portSpec = 契約 / 宣告 / 規格
 * - Clone 層：回傳物件 = 可變的 runtime 儲存空間
 *
 * @param {Array<{ name: string }>} portSpec
 * 原型中定義的 port 規格清單，每個項目至少包含 port 名稱。
 *
 * @returns {Object<string, undefined>}
 * 一個以 port 名稱為 key 的物件，作為 clone instance 的
 * input / output runtime storage，初始值為 undefined。
 */
function materializePort(portSpec) {
  const port = {};
  for (const spec of portSpec) {
    port[spec.name] = { value: undefined };
  }
  return port;
}

function createValueView(boxes) {
  return new Proxy({}, {
    get(_, key) {
      return boxes[key]?.value;
    },
    set(_, key, val) {
      if (!boxes[key]) {
        throw new Error(`Unknown port: ${String(key)}`);
      }
      boxes[key].value = val;
      return true;
    }
  });
}

