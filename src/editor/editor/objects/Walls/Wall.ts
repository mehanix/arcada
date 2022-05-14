import {  Graphics, InteractionEvent, Point } from "pixi.js";
import { getWindow } from "../../../../api/api-client";

import { Tool, useStore } from "../../../../stores/ToolStore";
import { AddFurnitureAction } from "../../actions/AddFurnitureAction";
import { AddNodeAction } from "../../actions/AddNodeAction";
import { DeleteWallAction } from "../../actions/DeleteWallAction";
import {  WALL_THICKNESS } from "../../constants";
import { Label } from "../TransformControls/Label";
import { WallNode } from "./WallNode";

export class Wall extends Graphics {

    leftNode: WallNode;
    rightNode: WallNode;
    length: number;
    label: Label;
    
    x1:number;
    x2:number;
    y1:number;
    y2:number;
    constructor(leftNode: WallNode, rightNode: WallNode) {
        super();

        this.interactive = true;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.pivot.set(8, 8);
   
        this.setLineCoords();
        this.label = new Label(0);
        this.addChild(this.label)
        this.drawLine();
       
        this.on("mousedown", this.onMouseDown)
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

        let theta = Math.atan2((this.y2 - this.y1), (this.x2 - this.x1)); // aflu unghiul sa pot roti
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)

        let length = Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
        this.length = length;

        this.beginFill().drawRect(0, 0, length, WALL_THICKNESS).endFill()
        this.position.set(this.x1, this.y1)
        this.angle = theta

        this.leftNode.angle = theta;
        this.rightNode.angle = theta;

        this.label.update(length);
        this.label.position.x = this.width / 2;
        console.log(theta);
        this.label.angle =  360 - theta 
    
        
        // this.label.position.y = 25;

    }

    private onMouseDown(ev: InteractionEvent) {
        ev.stopPropagation();
        let coords = new Point(ev.data.global.x, ev.data.global.y)
        let localCoords =  ev.data.getLocalPosition(this)

        const state = useStore.getState()

        if (state.activeTool == Tool.WallRemove) {

            let action = new DeleteWallAction(this);
            action.execute();
        }

        if (state.activeTool == Tool.WallAdd) {
            const addNode = new AddNodeAction(this, coords);
            addNode.execute();
        }
        if (state.activeTool == Tool.FurnitureAddWindow) {
            getWindow().then(res => {
                console.log(res[0], this, new Point(localCoords.x, 0))
                let action = new AddFurnitureAction(res[0], this, new Point(localCoords.x, 0), this.leftNode.getId(), this.rightNode.getId());
                action.execute();
            })

        }

    }

}