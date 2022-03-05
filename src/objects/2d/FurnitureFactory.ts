import { Furniture } from "./Furniture";

export class FurnitureFactory {

    private constructor() { }

    public static create(furnitureId:string, index:number):Furniture {

        console.log(furnitureId);
        let newFurniture = new Furniture("sofa.svg", index);
        return newFurniture;
    }
}