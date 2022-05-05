import { Container, Point } from "pixi.js";
import { Serializer } from "../persistence/Serializer";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";
import { WallNodeSequence } from "./Walls/WallNodeSequence";
import { saveAs } from 'file-saver';
import { FloorPlanSerializable } from "../persistence/FloorPlanSerializable";
import { getWindow } from "../../../api/api-client";
import { IFurnitureSerializable } from "../persistence/IFurnitureSerializable";
export class FloorPlan extends Container {

    private static instance: FloorPlan;

    public furnitureArray: Map<number, Furniture>;
    private wallNodeSequence: WallNodeSequence;

    private serializer: Serializer;
    public furnitureId = 0;   // TODO repara cand repari backendul  

    public windowFurniture: FurnitureData;
    private constructor() {
        super();
        this.furnitureArray = new Map<number, Furniture>();
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
        let blob = new Blob([floorPlan], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "floor_plan.txt")

    }

    public load(planText: string) {
        console.log("text:", planText);
        let plan: FloorPlanSerializable = JSON.parse(planText)
        console.log(plan)
        this.reset();
        this.wallNodeSequence.reset();
        let nodeLinks = new Map<number, number[]>(plan.wallNodeLinks)
        this.wallNodeSequence.load(plan.wallNodes, nodeLinks);

        for (let furniture of plan.furnitureArray) {
            this.loadFurniture(furniture);
        }

        this.furnitureId = plan.furnitureId;
        this.wallNodeSequence.setId(plan.wallNodeId);

    }



    // cleans up everything. prepare for new load.
    private reset() {

        // remove furniture
        for (let id of this.furnitureArray.keys()) {
                this.removeFurniture(id);
            
        }
        this.furnitureId = 0;
        this.wallNodeSequence.reset();
        this.furnitureArray = new Map<number, Furniture>();

    }

    private loadFurniture(fur: IFurnitureSerializable) {

        let furnitureData: FurnitureData = { //todo. nu e complet aici
            _id: "",
            name: "",
            width: 0,
            height: 0,
            imagePath: "",
            category: ""
        };
        furnitureData.height = fur.height;
        furnitureData.width = fur.width;
        furnitureData.imagePath = fur.texturePath;
        let attachedTo = this.wallNodeSequence.getWall(fur.attachedToLeft, fur.attachedToRight)

        let object = new Furniture(furnitureData, fur.id, attachedTo)
        this.furnitureArray.set(fur.id, object);

        if (attachedTo != undefined) {
            attachedTo.addChild(object)
        } else {
            this.addChild(object)
        }
        object.position.set(fur.x, fur.y)
        object.rotation = fur.rotation;
    
    }

    public addFurniture(obj: FurnitureData, attachedTo?: Wall, coords?: Point) {

        this.furnitureId += 1;
        let object = new Furniture(obj, this.furnitureId, attachedTo)
        this.furnitureArray.set(this.furnitureId,object);

        if (attachedTo !== undefined) {
            attachedTo.addChild(object)
            object.position.set(coords.x, coords.y)
        } else {
            this.addChild(object)
            object.position.set(150, 150)
        }


        return this.furnitureId;
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
        this.furnitureArray.get(id).destroy(true);
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
        console.log(wall)
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();

        if (this.wallNodeSequence.contains(leftNode)) {
            console.log("hi")
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
