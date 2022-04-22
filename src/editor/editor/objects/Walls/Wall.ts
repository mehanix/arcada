import {  Graphics, InteractionEvent, Point } from "pixi.js";
import { FurnitureData } from "../../../../stores/FurnitureStore";
import { Tool, useStore } from "../../../../stores/ToolStore";
// import { ToolManager } from "../../actions/ToolManager";
// import { useGlobalState } from "../../../../GlobalStateProvider";
import {  WALL_THICKNESS } from "../../constants";
import { FloorPlan } from "../FloorPlan";
import { Furniture } from "../Furniture";
import { Label } from "../TransformControls/Label";
import { WallNode } from "./WallNode";

export interface IAnchor {
    other: Wall;
    otherPoint: Point; // local points
    myPoint: Point;
}

export class Wall extends Graphics {

    leftNode: WallNode;
    rightNode: WallNode;
    length: number;
    label: Label;
    test: Furniture;
    id: number;
    x1:number;
    x2:number;
    y1:number;
    y2:number;
    constructor(leftNode: WallNode, rightNode: WallNode) {
        super();

        this.interactive = true;
        // this.attachedFurniture = [];
        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.pivot.set(8, 8);
   
        this.setLineCoords();
        this.label = new Label(0);
        this.addChild(this.label)
        this.drawLine();
       
        this.on("mousedown", this.onMouseDown)
        // this.on("mousemove", this.onMouseMove)
        // this.on("mouseup",this.onMouseUp);
        // this.on("mouseupoutside",this.onMouseUp);


    }

    public setLineCoords() {
        this.x1 = this.leftNode.x;
        this.x2 = this.rightNode.x;
        this.y1 = this.leftNode.y;
        this.y2 = this.rightNode.y;

    }
    public drawLine() {
        this.clear();
        this.setLineCoords();
        this.lineStyle(1, 0x1a1a1a);

        // if (x1 > x2) { //TODO scrie mai frumos aici
        //     let aux;
        //     aux = x1
        //     x1 = x2;
        //     x2 = aux;
        //     aux = y1;
        //     y1 = y2;
        //     y2 = aux

        // }

        let theta = Math.atan2((this.y2 - this.y1), (this.x2 - this.x1)); // aflu unghiul sa pot roti
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        console.log(theta)
        let length = Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
        this.length = length;
        console.log(length)
        this.beginFill().drawRect(0, 0, length, WALL_THICKNESS).endFill()
        this.position.set(this.x1, this.y1)
        this.angle = theta

        // for (let attached of this.attachedFurniture) {
        //     console.log("salsal")
        //     attached.parentAngle = theta;
        // }

        this.label.update(length);
        this.label.position.x = this.width / 2;
        this.label.position.y = -25;

    }

    private onMouseDown(ev: InteractionEvent) {
        ev.stopPropagation();
        let coords = new Point(ev.data.global.x, ev.data.global.y)
        console.log("hi!", this.leftNode, this.rightNode, coords.x, coords.y)
        const state = useStore.getState()

        if (state.activeTool == Tool.WallRemove) {
            console.log("stergem", this.leftNode, this.rightNode)
            FloorPlan.Instance.removeWall(this);
        }

        if (state.activeTool == Tool.WallAdd) {
            console.log("add", this.leftNode, this.rightNode)
            FloorPlan.Instance.addNodeToWall(this, coords);
        }
        if (state.activeTool == Tool.FurnitureAddWindow) {
            let f1:FurnitureData= {
                width:"2.0",
                height:"1.0",
                id:"canapea-1-l-2-1",
                name:"canapea mare"
            }
             FloorPlan.Instance.addFurniture(f1, "living_room", this);
        }

    }

}