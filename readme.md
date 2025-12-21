s for shell
k for kernel

User 定義意圖，
s 定義語言，
k 定義真實發生的事。

dag = control + graph + executor
graph = nodes & edges
nodes: input, output, handler, ifExternal

concept: user operates the dag through a control panel


原型本身其實 input / output 跟 handler 在本質上是脫鉤的
原型本身是一種契約或宣告或配置檔
真正的三者合一是在 clone 階段發生的

使用者宣告的input, output spec的長相
spec = [], el = {name:"para name", type:"para type"}

/**
 * @typedef {Object} PrototypeNodeSpec
 *
 * @property {PortSpec[]} input
 *   Input port 規格清單。
 *   描述此節點可接收哪些輸入。
 *
 * @property {PortSpec[]} output
 *   Output port 規格清單。
 *   描述此節點會產生哪些輸出。
 *
 * @property {Function} handler
 *   純邏輯處理函式。
 *   接收 input 值，回傳對應 output 的物件。
 *
 * @example
 * const addNode = {
 *   input: [
 *     { name: "a", type: "number" },
 *     { name: "b", type: "number" }
 *   ],
 *   output: [
 *     { name: "sum", type: "number" }
 *   ],
 *   handler({ a, b }) {
 *     return { sum: a + b };
 *   }
 * };
 */


materializePort:
把「宣告存在的孔位」
轉成「instance 專屬的記憶體位置」
目前在這個階段不會使用到in/output的para type
僅僅是將prototype中記錄的input/outputs = [para1,para2...]轉換成
clone node input ={ para1, para2,...}
