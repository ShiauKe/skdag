import { k } from "../k/index.js";
import { printGraph, printNeighborhood } from "./observe.js";
/**
 * Shell API
 * This is the only surface users should touch.
 */
export const s = Object.freeze({
        getProtoTypeRepo(){
                return k.prototypeNodeRepo
        },
        registerPrototypeNode(name, spec) {
                return k.createNodePrototype(name, spec);
        },
        getNodeCloneRepo(){
                return k.getNodeCloneRepo()
        },
        topoSortByEdges(graph){
                return k.topoSortByEdges(graph)
        },
        printGraph(graph){
                return printGraph(graph)
        },
        printNeighborhood(graph, nodeId){
                return printNeighborhood(graph, nodeId)
        },
        executeGraph(graph){ 
                return k.executeGraph(graph)
        }
});
