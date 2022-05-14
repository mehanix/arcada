import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class ChangeFloorAction implements Action{

  
    private receiver:FloorPlan;
    private by:number
    constructor(by:number) {
        this.by = by;
        this.receiver = FloorPlan.Instance;

    }


    public execute() {
        this.receiver.changeFloor(this.by);
    }
}