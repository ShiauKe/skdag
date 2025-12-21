import {prototypeNodeRepo} from "./repo/__prototypeNodesRepo.js";
import {guardName, guardSpec} from "./utils/__validation.js";
// 開一個map來存prototype node

// 傳入name和spec，透過工廠函式建立一個prototype node並存入repo
export function createNodePrototype(name, spec) {
  guardName(name)
  guardSpec(spec)
  if (prototypeNodeRepo.has(name)) throw new Error(`Node prototype "${name}" already exists`);
  //prototype工廠：根據name和spec建立一個prototype物件並確保immutable
  const proto = manufacturePrototypeNode(name, spec);
  // 生產完畢就存入prototypeNodeRepo
  prototypeNodeRepo.set(name, proto);
}

function manufacturePrototypeNode(name, spec){
  return Object.freeze({
    name,
    input: structuredClone(spec.input),
    output: structuredClone(spec.output),
    handler: spec.handler
  });
} 




