import { Point } from "pixi.js";
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
    constructor(obj: FurnitureData, attachedTo?: Wall, coords?: Point, attachedToLeft?:number, attachedToRight?:number) {
        console.log(obj, attachedTo, coords);
        this.obj = obj;
        this.attachedTo = attachedTo;
        this.coords = coords;
        this.attachedToLeft = attachedToLeft;
        this.attachedToRight = attachedToRight;

    }


    public execute() {
        FloorPlan.Instance.addFurniture(this.obj, this.attachedTo, this.coords, this.attachedToLeft, this.attachedToRight);
    }
}