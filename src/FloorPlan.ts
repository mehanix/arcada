import { Container } from "pixi.js";
import { Furniture } from "./objects/2d/Furniture";
import { FurnitureFactory } from "./objects/2d/FurnitureFactory";

export class FloorPlan extends Container {


    private static instance: FloorPlan;

    public furnitureArray: Record<number, Furniture>;
    //private wallArray: Wall[];

    private furnitureId = 0;

    private constructor() {
        super();
        this.furnitureArray = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this.instance || (this.instance = new this());
    }

    public addFurniture(type:string) {

        this.furnitureId += 1;
        let object = FurnitureFactory.create(type, this.furnitureId);
        this.furnitureArray[this.furnitureId] = object;
        this.addChild(object)
        console.log(this.furnitureArray)
    }
    public removeFurniture(id:number) {

        console.log("arivederci")

        this.removeChild(this.furnitureArray[id]);
        delete this.furnitureArray[id];
        console.log(this.furnitureArray)
    }

    public getObject(id:number) {
        return this.furnitureArray[id];
    }

}
