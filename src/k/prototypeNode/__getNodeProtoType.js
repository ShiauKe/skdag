import {prototypeNodeRepo} from "./repo/__prototypeNodesRepo.js";
import {guardName} from "./utils/__validation.js";
// 開一個map來存prototype node


export function getNodePrototype(name) {
  guardName(name)
  const proto = prototypeNodeRepo.get(name);
  if (!proto) {
    throw new Error(`Unknown node prototype "${name}, please create a ptototype node first."`);
  }
  return proto;
}


