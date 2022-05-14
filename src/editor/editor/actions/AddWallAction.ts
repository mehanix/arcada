import { FloorPlan } from "../objects/FloorPlan";
import { WallNode } from "../objects/Walls/WallNode";
import { Action } from "./Action";

// Add wall between two nodes of FloorPlan
export class AddWallAction implements Action {
    
    private leftNode:number;
    private rightNode: number;
    private receiver:FloorPlan;   

    constructor(left:WallNode, right:WallNode) {
        this.leftNode = left.getId();
        this.rightNode = right.getId();
        this.receiver = FloorPlan.Instance;
    }

    public execute() {
        this.receiver.actions.push(this);
        return this.receiver.getWallNodeSeq().addWall(this.leftNode, this.rightNode)
    }
}