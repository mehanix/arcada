import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class DeleteWallNodeAction implements Action {

    private id:number;
    constructor(id:number) {
        this.id = id;
    }

    public execute(): void {
        FloorPlan.Instance.removeWallNode(this.id);
        
    }
}

