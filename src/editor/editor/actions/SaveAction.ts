import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class SaveAction implements Action {

    private receiver: FloorPlan;
    constructor() {
        this.receiver = FloorPlan.Instance;

    }

    public execute() {
        this.receiver.save();
    }
}