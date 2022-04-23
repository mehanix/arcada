import { endpoint } from "../../../api/api-client";
import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";

export class FurnitureFactory {

    private constructor() { }
    // todo scapa de mine?
    public static create(furnitureId: string, category:string, index: number, width: string, height: string, attachedTo?:Wall): Furniture {
        let assetUrl = `${endpoint}${category}/${furnitureId}`
        let isAttached = attachedTo ? true:false;

        let newFurniture = new Furniture(assetUrl, index, parseFloat(width), parseFloat(height), attachedTo);
        if (isAttached) {
            attachedTo.addChild(newFurniture)
        }
        return newFurniture;
    }

}