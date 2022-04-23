import { Point } from "pixi.js";
import { endpoint } from "../../../api/api-client";
import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";

export class FurnitureFactory {

    private constructor() { }

    public static create(furnitureId: string, category:string, index: number, width: string, height: string, stickyTarget?:Wall, stickyCoords?:Point): Furniture {
        let assetUrl = `${endpoint}${category}/${furnitureId}`
        let newFurniture = new Furniture(assetUrl, index, parseFloat(width), parseFloat(height), stickyTarget, stickyCoords);
        return newFurniture;
    }

}