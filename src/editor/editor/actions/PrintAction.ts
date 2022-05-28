import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class PrintAction implements Action {

    private receiver: FloorPlan;
    constructor() {
        this.receiver = FloorPlan.Instance;

    }

    public execute() {
        this.receiver.print();
    }
}