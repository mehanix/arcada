import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class DeleteWallNodeAction implements Action {

    private id:number;
    private receiver:FloorPlan;
    constructor(id:number) {
        this.id = id;
        this.receiver = FloorPlan.Instance;
    }

    public execute(): void {
        this.receiver.actions.push(this);
        this.receiver.removeWallNode(this.id);
        
    }
}

