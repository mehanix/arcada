import { Container, Point } from "pixi.js";
import { Serializer } from "../persistence/Serializer";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";
import { WallNodeSequence } from "./Walls/WallNodeSequence";
import { saveAs } from 'file-saver';
import { FloorPlanSerializable } from "../persistence/FloorPlanSerializable";
import { getWindow } from "../../../api/api-client";
export class FloorPlan extends Container {
   
    private static instance: FloorPlan;

    public furnitureArray: Record<number, Furniture>;
    private wallNodeSequence: WallNodeSequence;

    private serializer:Serializer;
    public furnitureId = 0;   // TODO repara cand repari backendul  

    public windowFurniture: FurnitureData;
    private constructor() {
        super();
        this.furnitureArray = {};
        this.wallNodeSequence = new WallNodeSequence();
        this.addChild(this.wallNodeSequence);
        this.serializer = new Serializer();
        
        this.windowFurniture = getWindow();
    }
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public getWallNodeSeq() {
        return this.wallNodeSequence
    }

    public save() {
        let floorPlan = this.serializer.serialize(this.furnitureArray, this.furnitureId, this.wallNodeSequence);
        let blob = new Blob([floorPlan], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "floor_plan.txt")

    }

    public load(planText:string) {
        console.log("text:", planText);
        let plan: FloorPlanSerializable = JSON.parse(planText)
        console.log(plan)
        this.reset();
        this.wallNodeSequence.reset();
        this.wallNodeSequence.load(plan.wallNodes, plan.wallNodeLinks);

        for (let furniture of plan.furnitureArray) {
            console.log(furniture) // refa backend. nu uita de salvat si valori id-uri in json.
        }

    }

    // cleans up everything. prepare for new load.
    private reset() {
        
        // remove furniture
        for (let i = 1; i <= this.furnitureId; i++) {
            if(this.furnitureArray[i] != undefined) {
                this.removeFurniture(i);
            }
        }
        this.furnitureId = 0;
        this.wallNodeSequence.reset();
        this.furnitureArray = {};

    }
    public addFurniture(obj: FurnitureData, attachedTo?:Wall, coords?:Point) {

        this.furnitureId += 1;
        let object = new Furniture(obj, this.furnitureId, attachedTo)
        this.furnitureArray[this.furnitureId] = object;
        
        if (attachedTo !== undefined) {
            attachedTo.addChild(object)
            object.position.set(coords.x, coords.y)
        } else {
            this.addChild(object)
            object.position.set(150, 150)
        }


        return this.furnitureId;
    }

    public setFurniturePosition(id: number, x:number, y:number, angle?:number) {
        this.furnitureArray[id].position.set(x,y);
        if (angle) {
            this.furnitureArray[id].angle = angle;
        }
    }
    
    public removeFurniture(id: number) {

        if(this.furnitureArray[id].isAttached) {
            this.furnitureArray[id].parent.removeChild(this.furnitureArray[id])
        } else {
            this.removeChild(this.furnitureArray[id]);
        }
        this.furnitureArray[id].destroy(true);
        delete this.furnitureArray[id];
    }

    public getObject(id: number) {
        return this.furnitureArray[id];
    }

    public redrawWalls() {
        this.wallNodeSequence.drawWalls();
    }


    public removeWallNode(nodeId: number) {

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

    public addNodeToWall(wall:Wall, coords:Point) {
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();
        // delete wall between left and right node
        this.removeWall(wall);
        // add node and connect walls to it
        let newNode = this.wallNodeSequence.addNode(coords.x - coords.x%10, coords.y - coords.y%10);
        let newNodeId = newNode.getId()
        this.wallNodeSequence.addWall(leftNode, newNodeId);
        this.wallNodeSequence.addWall(newNodeId, rightNode);
        
        return newNode;
    }

}
