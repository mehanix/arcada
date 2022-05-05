import { Container, Point } from "pixi.js";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";
import { WallNodeSequence } from "./Walls/WallNodeSequence";

export class Floor extends Container{

    public furnitureArray: Map<number, Furniture>;
    private wallNodeSequence: WallNodeSequence;

    constructor() {
        super();
        this.furnitureArray = new Map<number, Furniture>();
        this.wallNodeSequence = new WallNodeSequence();
        this.addChild(this.wallNodeSequence);

    }

        
    public getWallNodeSequence() {
        return this.wallNodeSequence
    }
    
    public clearScreen() {
        for (let child of this.children) {
            child.visible = false;
        }
    }

    public draw() {
        for (let child of this.children) {
            child.visible = true;
        }
        // for (let fur of this.furnitureArray.values()) {
        //     this.addChild(fur);
        // }
        
        // // this.wallNodeSequence.drawNodes();
        // this.redrawWalls();
    }
    public addFurniture(obj: FurnitureData, id:number, attachedTo?: Wall, coords?: Point) {

        let object = new Furniture(obj, id, attachedTo)
        this.furnitureArray.set(id,object);

        if (attachedTo !== undefined) {
            attachedTo.addChild(object)
            object.position.set(coords.x, coords.y)
        } else {
            this.addChild(object)
            object.position.set(150, 150)
        }


        return id;
    }

    public setFurniturePosition(id: number, x: number, y: number, angle?: number) {
        this.furnitureArray.get(id).position.set(x, y);
        if (angle) {
            this.furnitureArray.get(id).angle = angle;
        }
    }

    public removeFurniture(id: number) {

        if (this.furnitureArray.get(id).isAttached) {
            this.furnitureArray.get(id).parent.removeChild(this.furnitureArray.get(id))
        } else {
            this.removeChild(this.furnitureArray.get(id));
        }
        this.furnitureArray.get(id).destroy({
            children:true,
            texture:false,
            baseTexture:false

        });
        this.furnitureArray.delete(id);
    }

    public getObject(id: number) {
        return this.furnitureArray.get(id);
    }


    public redrawWalls() {
        this.wallNodeSequence.drawWalls();
    }


    public removeWallNode(nodeId: number) {

        console.log("remove wall node", nodeId, "from ", this.wallNodeSequence)
        if (this.wallNodeSequence.contains(nodeId)) {
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

    public addNodeToWall(wall: Wall, coords: Point) {
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();
        // delete wall between left and right node
        this.removeWall(wall);
        // add node and connect walls to it
        let newNode = this.wallNodeSequence.addNode(coords.x - coords.x % 10, coords.y - coords.y % 10);
        let newNodeId = newNode.getId()
        this.wallNodeSequence.addWall(leftNode, newNodeId);
        this.wallNodeSequence.addWall(newNodeId, rightNode);

        return newNode;
    }

}