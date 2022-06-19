import saveAs from "file-saver";
import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class SaveAction implements Action {

    private receiver: FloorPlan;
    constructor() {
        this.receiver = FloorPlan.Instance;

    }

    public execute() {
        let data = this.receiver.save();
        let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "floor_plan.txt")

    }
}