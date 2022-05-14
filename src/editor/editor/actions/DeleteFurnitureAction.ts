import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

// Action for removing furniture piece from FloorPlan.
export class DeleteFurnitureAction implements Action {
    private id:number;
    private receiver:FloorPlan;

    constructor(id:number) {
        this.id = id;
        this.receiver = FloorPlan.Instance;
    }

    public execute() {
        this.receiver.actions.push(this);
        this.receiver.removeFurniture(this.id);
    }
}

