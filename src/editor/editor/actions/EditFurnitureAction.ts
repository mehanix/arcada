import { Furniture } from "../objects/Furniture";
import { TransformLayer } from "../objects/TransformControls/TransformLayer";
import { Action } from "./Action";

// Action for selecting furniture piece to edit.
export class EditFurnitureAction implements Action {
    private furniture:Furniture;
    private receiver:TransformLayer;

    constructor(furniture:Furniture) {
        this.furniture = furniture;
        this.receiver = TransformLayer.Instance;
    }

    public execute() {
        this.receiver.select(this.furniture);
    }
}
