import { Container, Point } from "pixi.js";
// import { Serializer } from "../persistence/Serializer";
import { FurnitureData } from "../../../stores/FurnitureStore";
// import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";
// import { WallNodeSequence } from "./Walls/WallNodeSequence";
// import { saveAs } from 'file-saver';
// import { FloorPlanSerializable } from "../persistence/FloorPlanSerializable";
// import { IFurnitureSerializable } from "../persistence/IFurnitureSerializable";
import { Floor } from "./Floor";
export class FloorPlan extends Container {

    private static instance: FloorPlan;

    private floors: Floor[];

    // private serializer: Serializer;
    public furnitureId = 0;   // TODO repara cand repari backendul  

    public windowFurniture: FurnitureData;

    public  currentFloor = 0;
    private constructor() {
        super();
        this.floors = [];
        this.floors.push(new Floor());
        this.addChild(this.floors[0]);
        // this.serializer = new Serializer();

    }
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

 
    public changeFloor(by:number) {
        console.log("previous floor:", this.floors[this.currentFloor])
        this.removeChild(this.floors[this.currentFloor]);
        // this.floors[this.currentFloor].clearScreen();
        this.currentFloor += by;
        if (this.floors[this.currentFloor] == null) {
            this.floors[this.currentFloor] = new Floor();
        }
        console.log("new floor:", this.floors[this.currentFloor])

        // this.floors[this.currentFloor].draw();
        this.addChild(this.floors[this.currentFloor])
    }


    public save() {
    
        // let floorPlan = this.serializer.serialize(this.furnitureArray, this.furnitureId, this.wallNodeSequence);
        // let blob = new Blob([floorPlan], { type: "text/plain;charset=utf-8" });
        // saveAs(blob, "floor_plan.txt")
         

    }

    public load(_planText: string) {
        // console.log("text:", planText);
        // let plan: FloorPlanSerializable = JSON.parse(planText)
        // console.log(plan)
        // this.reset();
        // this.wallNodeSequence.reset();
        // let nodeLinks = new Map<number, number[]>(plan.wallNodeLinks)
        // this.wallNodeSequence.load(plan.wallNodes, nodeLinks);

        // for (let furniture of plan.furnitureArray) {
        //     this.loadFurniture(furniture);
        // }

        // this.furnitureId = plan.furnitureId;
        // this.wallNodeSequence.setId(plan.wallNodeId);

    }



    // cleans up everything. prepare for new load. TODO Feature multiple floors
    // private reset() {
        
    //     // remove furniture
    //     for (let id of this.floors[this.currentFloor].furnitureArray.keys()) {
    //             this.removeFurniture(id);
            
    //     }
    //     this.furnitureId = 0;
    //     this.wallNodeSequence.reset();
    //     this.floors[this.currentFloor].furnitureArray = new Map<number, Furniture>();

    // }

    // private loadFurniture(fur: IFurnitureSerializable) { TODO Multiple floors
    //     let furnitureData: FurnitureData = { //todo. nu e complet aici
    //         _id: "",
    //         name: "",
    //         width: 0,
    //         height: 0,
    //         imagePath: "",
    //         category: ""
    //     };
    //     furnitureData.height = fur.height;
    //     furnitureData.width = fur.width;
    //     furnitureData.imagePath = fur.texturePath;
    //     let attachedTo = floor.getWallNodeSequence().getWall(fur.attachedToLeft, fur.attachedToRight)

    //     let object = new Furniture(furnitureData, fur.id, attachedTo)
    //     floor.furnitureArray.set(fur.id, object);

    //     if (attachedTo != undefined) {
    //         attachedTo.addChild(object)
    //     } else {
    //         this.addChild(object)
    //     }
    //     object.position.set(fur.x, fur.y)
    //     object.rotation = fur.rotation;
    
    // }

    public addFurniture(obj: FurnitureData, attachedTo?: Wall, coords?: Point) {


        this.furnitureId += 1;
        this.floors[this.currentFloor].addFurniture(obj,this.furnitureId, attachedTo, coords);
    }

    public setFurniturePosition(id: number, x: number, y: number, angle?: number) {
        this.floors[this.currentFloor].setFurniturePosition(id,x,y,angle);
    }

    public removeFurniture(id: number) {

        this.floors[this.currentFloor].removeFurniture(id);
    }

    public getObject(id: number) {
        return  this.floors[this.currentFloor].getObject(id)
    }

    public redrawWalls() {
        this.floors[this.currentFloor].redrawWalls();
    }


    public removeWallNode(nodeId: number) {

        this.floors[this.currentFloor].removeWallNode(nodeId)
    }

    public removeWall(wall: Wall) {
        this.floors[this.currentFloor].removeWall(wall);
    }

    public addNodeToWall(wall: Wall, coords: Point) {
        return this.floors[this.currentFloor].addNodeToWall(wall,coords);
    }

    public getWallNodeSeq() {
        return this.floors[this.currentFloor].getWallNodeSequence()
    }

    public getFloor() {
        return this.floors[this.currentFloor];
    }

}
