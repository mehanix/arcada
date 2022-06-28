import { autoDetectRenderer, Container, IRendererOptionsAuto } from "pixi.js";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { Wall } from "./Walls/Wall";
import { Floor } from "./Floor";
import { Serializer } from "../persistence/Serializer";
import { FloorPlanSerializable } from "../persistence/FloorPlanSerializable";
import { Action } from "../actions/Action";
import { useStore } from "../../../stores/EditorStore";
import { Point } from "../../../helpers/Point";
import { showNotification } from "@mantine/notifications";

export class FloorPlan extends Container {

    private static instance: FloorPlan;

    private floors: Floor[];
    private visibleLabels: boolean = true;
    private serializer: Serializer;
    public furnitureId = 0;   // TODO uuid?
    public windowFurniture: FurnitureData;
    public actions: Action[];

    public currentFloor = 0;
    private constructor() {
        super();
        this.floors = [];
        this.actions = [];
        this.floors.push(new Floor());
        this.addChild(this.floors[0]);
        this.serializer = new Serializer();
    }
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public get CurrentFloor() {
        return this.currentFloor;
    }

    public set CurrentFloor(floor: number) {
        this.currentFloor = floor;
        useStore.setState({ floor: this.currentFloor })
    }

    public toggleLabels() {
        this.visibleLabels = !this.visibleLabels;
        this.floors[this.currentFloor].setLabelVisibility(this.visibleLabels);
    }

    public changeFloor(by: number) {

        this.removeChild(this.floors[this.currentFloor]);
        let previousFloor = this.currentFloor;
        this.CurrentFloor += by;
        if (this.floors[this.currentFloor] == null) {
            this.floors[this.currentFloor] = new Floor(null, this.floors[previousFloor]);
        }
        this.floors[this.currentFloor].setLabelVisibility(this.visibleLabels);
        this.addChild(this.floors[this.currentFloor])
    }

    public print() {

        let opts: IRendererOptionsAuto = {
            preserveDrawingBuffer: true
        };

        let renderer = autoDetectRenderer(opts);
        const image = renderer.plugins.extract.image(this)
        let popup = window.open();
        popup.document.body.appendChild(image);
        popup.focus();
        popup.print();
    }

    public save() {

        let floorPlan = this.serializer.serialize(this.floors, this.furnitureId);
        return floorPlan;
    }

    public load(planText: string) {
        let plan: FloorPlanSerializable = JSON.parse(planText)
        this.reset();
        for (let floorData of plan.floors) {
            let floor = new Floor(floorData);
            this.floors.push(floor);
        }

        this.furnitureId = plan.furnitureId;
        this.floors[0].getWallNodeSequence().setId(plan.wallNodeId);
        this.addChild(this.floors[this.currentFloor])
    }

    // removes current floor
    public removeFloor() {
        if (this.floors.length < 2) {
            showNotification({
                title:"Floor removal not permitted",
                message:"This floor is the only floor in the plan. You cannot have a plan with no floors. Create a new floor before deleting.",
                color:'red'
            })
            return;
        }
        let oldCurrentFloor = this.currentFloor;
        this.changeFloor(-1);
        this.floors[oldCurrentFloor].reset();
        this.floors.splice(oldCurrentFloor, 1);
        this.changeFloor(1);
        console.log(this.floors)
    }

    // cleans up everything. prepare for new load. TODO Feature multiple floors
    private reset() {

        // remove furniture
        for (let floor of this.floors) {
            floor.reset();
        }

        // remove all floors
        this.floors = [];
        this.currentFloor = 0;
        this.furnitureId = 0;

    }

    public addFurniture(obj: FurnitureData, attachedTo?: Wall, coords?: Point, attachedToLeft?: number, attachedToRight?: number) {


        this.furnitureId += 1;
        this.floors[this.currentFloor].addFurniture(obj, this.furnitureId, attachedTo, coords, attachedToLeft, attachedToRight);
    }



    public setFurniturePosition(id: number, x: number, y: number, angle?: number) {
        this.floors[this.currentFloor].setFurniturePosition(id, x, y, angle);
    }

    public removeFurniture(id: number) {

        this.floors[this.currentFloor].removeFurniture(id);
    }

    public getObject(id: number) {
        return this.floors[this.currentFloor].getObject(id)
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
        return this.floors[this.currentFloor].addNodeToWall(wall, coords);
    }
    public addNode(leftId: number, rightId: number) {
        return this.floors[this.currentFloor].addNode(leftId, rightId);
    }

    public getWallNodeSeq() {
        return this.floors[this.currentFloor].getWallNodeSequence()
    }

    public getFurniture() {
        return this.floors[this.currentFloor].getFurniture();
    }
}
