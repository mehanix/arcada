import { Furniture } from "./Furniture";

export class FurnitureFactory {

    private constructor() { }

    public static create(furnitureUrl:string, index:number):Furniture {

        console.log(furnitureUrl);
        let newFurniture = new Furniture(furnitureUrl, index);
        return newFurniture;
    }
    
}