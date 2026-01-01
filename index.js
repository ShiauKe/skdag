import { s } from './src/s/index.js';

const skdag = {}

// 明確選擇要 expose 的 API
Object.assign(skdag, {
  getProtoTypeRepo: s.getProtoTypeRepo,
  registerPrototypeNode: s.registerPrototypeNode,
  getNodeCloneRepo: s.getNodeCloneRepo,
  topoSortByEdges: s.topoSortByEdges,
  printGraph: s.printGraph,
  printNeighborhood: s.printNeighborhood,
  executeGraph: s.executeGraph,
  run: s.run // async, return Promise
})

Object.freeze(skdag)

export default skdag
