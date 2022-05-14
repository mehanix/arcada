import { FloorPlan } from "../objects/FloorPlan";
import { Wall } from "../objects/Walls/Wall";
import { Action } from "./Action";

export class DeleteWallAction implements Action {

    private wall:Wall; //TODO: Add node data pt undo/redo
    private receiver:FloorPlan;

    constructor(wall:Wall) {
        this.wall = wall;
        this.receiver = FloorPlan.Instance;
    }

    public execute(): void {
        this.receiver.actions.push(this);
        this.receiver.removeWall(this.wall);
        
    }
}

