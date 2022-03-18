import { Container } from "pixi.js";
import { Furniture } from "../2d/Furniture";
import { FurnitureFactory } from "../2d/FurnitureFactory";
import { WallNodeSequence } from "./Walls/WallNodeSequence";

export class FloorPlan extends Container {


    private static instance: FloorPlan;

    public furnitureArray: Record<number, Furniture>;

    private wallSequenceArray:Record<number, WallNodeSequence>;
    private furnitureId = 0;
    private wallGroupId = 0;
    private constructor() {
        super();
        this.furnitureArray = {};
        this.wallSequenceArray = {};
        this.wallSequenceArray[this.wallGroupId] = new WallNodeSequence();
        this.addChild(this.wallSequenceArray[0]);

    }

    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }

    public addFurniture(type:string) {

        this.furnitureId += 1;
        let object = FurnitureFactory.create(type, this.furnitureId);
        this.furnitureArray[this.furnitureId] = object;
        this.addChild(object)

        object.position.set(150,150)
        console.log(this.furnitureArray)
    }

    public removeFurniture(id:number) {

        this.removeChild(this.furnitureArray[id]);
        delete this.furnitureArray[id];
        console.log(this.furnitureArray)
    }

    public getObject(id:number) {
        return this.furnitureArray[id];
    }

    public redrawWalls() {
        for (const [_, seq] of Object.entries(this.wallSequenceArray)) {
            seq.drawWalls();
          }
          
    }

}
