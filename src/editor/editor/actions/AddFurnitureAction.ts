import { Point } from "../../../helpers/Point";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { FloorPlan } from "../objects/FloorPlan";
import { Wall } from "../objects/Walls/Wall";
import { Action } from "./Action";

export class AddFurnitureAction implements Action{

    obj: FurnitureData;
    attachedTo: Wall;
    coords: Point;
    attachedToLeft: number;
    attachedToRight: number;
    private receiver:FloorPlan;

    constructor(obj: FurnitureData, attachedTo?: Wall, coords?: Point, attachedToLeft?:number, attachedToRight?:number) {
        this.obj = obj;
        this.attachedTo = attachedTo;
        this.coords = coords;
        this.attachedToLeft = attachedToLeft;
        this.attachedToRight = attachedToRight;
        this.receiver = FloorPlan.Instance;

    }


    public execute() {
        this.receiver.addFurniture(this.obj, this.attachedTo, this.coords, this.attachedToLeft, this.attachedToRight);
        this.receiver.actions.push(this);
    }
}