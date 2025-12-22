import {cloneNodesRepo} from "./__cloneNodesRepo.js";
// 開一個map來存prototype node


export function getNodeClone(name) {
  const clone = cloneNodesRepo.get(name);
  if (!clone) {
    throw new Error(`Unknown node clone "${name}, please create a clone node first."`);
  }
  return clone;
}


