import { Container, Graphics, InteractionEvent, Point } from "pixi.js";
import { useStore } from "../../../../stores/ToolStore";
// import { ToolManager } from "../../actions/ToolManager";
// import { useGlobalState } from "../../../../GlobalStateProvider";
import { Tool, WALL_THICKNESS } from "../../constants";
import { FloorPlan } from "../FloorPlan";
import { Furniture } from "../Furniture";
import { Label } from "../TransformControls/Label";
import { WallNode } from "./WallNode";

export interface IAnchor {
    other: Wall;
    otherPoint: Point; // local points
    myPoint: Point;
}

export class Wall extends Container {

    leftNode: WallNode;
    rightNode: WallNode;
    length: number;
    label: Label;
    wall: Graphics;
    test: Furniture;
    constructor(x1: number, y1: number, x2: number, y2: number, leftNode: WallNode, rightNode: WallNode) {
        super();

        this.interactive = true;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.wall = new Graphics();
        this.wall.pivot.set(8, 8);
        this.addChild(this.wall)
        this.test = new Furniture("http://localhost:4133/living_room/canapea-1-m-1.5-1", 50, 1, 1);
        this.test.pivot.set(this.test.height / 2, this.test.width / 2)
        this.addChild(this.test);
        this.drawLine(x1, y1, x2, y2);
        this.on("mousedown", this.onMouseDown)
        // this.on("mousemove", this.onMouseMove)
        // this.on("mouseup",this.onMouseUp);
        // this.on("mouseupoutside",this.onMouseUp);

        this.test.position.set(x1, y1)



    }

    private drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.wall.clear();
        this.wall.lineStyle(1, 0x1a1a1a);

        // if (x1 > x2) { //TODO scrie mai frumos aici
        //     let aux;
        //     aux = x1
        //     x1 = x2;
        //     x2 = aux;
        //     aux = y1;
        //     y1 = y2;
        //     y2 = aux

        // }

        let theta = Math.atan2((y2 - y1), (x2 - x1)); // aflu unghiul sa pot roti
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        console.log(theta)
        let length = Math.hypot(x1 - x2, y1 - y2);
        this.length = length;
        console.log(length)
        this.wall.beginFill().drawRect(0, 0, length, WALL_THICKNESS).endFill()
        this.wall.position.set(x1, y1)
        this.wall.angle = theta


        this.label = new Label(length);
        this.addChild(this.label)
        this.label.position.x = this.width / 2;
        this.label.position.y = -25;
        this.test.position.set(x1, y1)
         this.test.angle = this.wall.angle;

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
    }

}