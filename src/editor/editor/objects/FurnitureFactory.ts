import { endpoint } from "../../../api/api-client";
import { Furniture } from "./Furniture";

export class FurnitureFactory {

    private constructor() { }

    public static create(furnitureId: string, category:string, index: number, width: string, height: string): Furniture {
        let assetUrl = `${endpoint}${category}/${furnitureId}`
        let newFurniture = new Furniture(assetUrl, index, parseFloat(width), parseFloat(height));
        return newFurniture;
    }

}