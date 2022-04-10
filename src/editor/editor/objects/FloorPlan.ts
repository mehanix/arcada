import { Container, Point } from "pixi.js";
import { Furniture } from "./Furniture";
import { FurnitureFactory } from "./FurnitureFactory";
import { Wall } from "./Walls/Wall";
import { WallNodeSequence } from "./Walls/WallNodeSequence";

export class FloorPlan extends Container {


    private static instance: FloorPlan;

    public furnitureArray: Record<number, Furniture>;

    private wallNodeSequence: WallNodeSequence;
    private furnitureId = 0;

    private constructor() {
        super();
        this.furnitureArray = {};
        this.wallNodeSequence = new WallNodeSequence();
        this.addChild(this.wallNodeSequence);

    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public addFurniture(type: string) {

        this.furnitureId += 1;
        let object = FurnitureFactory.create(type, this.furnitureId);
        this.furnitureArray[this.furnitureId] = object;
        this.addChild(object)

        object.position.set(150, 150)
        console.log(this.furnitureArray)
    }

    public removeFurniture(id: number) {

        this.removeChild(this.furnitureArray[id]);
        delete this.furnitureArray[id];
        console.log(this.furnitureArray)
    }

    public getObject(id: number) {
        return this.furnitureArray[id];
    }

    public redrawWalls() {
        this.wallNodeSequence.drawWalls();
    }


    public removeWallNode(nodeId: number) {

        if (this.wallNodeSequence.contains(nodeId)) {
            console.log("m a gasit")
            this.wallNodeSequence.remove(nodeId);
        }

    }

    public removeWall(wall: Wall) {
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();

        if (this.wallNodeSequence.contains(leftNode)) {
            this.wallNodeSequence.removeWall(leftNode, rightNode);
        }
    }

    public addNodeToWall(wall:Wall, coords:Point) {
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();
        // delete wall between left and right node
        this.removeWall(wall);
        // add node and connect walls to it
        let newNode = this.wallNodeSequence.addNode(coords.x, coords.y);
        
        this.wallNodeSequence.addWall(leftNode, newNode);
        this.wallNodeSequence.addWall(newNode, rightNode);

    }
}
