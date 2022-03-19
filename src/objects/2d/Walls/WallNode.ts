import { Graphics, InteractionEvent, Point } from "pixi.js";
import { FloorPlan } from "../FloorPlan";

export class WallNode extends Graphics {

    private dragging:boolean;
    constructor(x:number, y: number) {
        super();
        this.interactive = true;
        this.pivot.set(0.5);
        this.beginFill(Math.floor(Math.random()*16777215));
        this.drawCircle(0,0,10)
        this.position.set(x,y)
        this.endFill();
        this.zIndex = 999;
        this.on("mousedown", this.mousedown)
        this.on("mousemove", this.onMouseMove)
        this.on("mouseup",this.onMouseUp);
        this.on("mouseupoutside",this.onMouseUp);


    }
  
    private mousedown() {
        this.dragging = true;
    }
    private onMouseMove(ev: InteractionEvent) {
        if (!this.dragging) {
            return;
        }
        let currentPoint = new Point(ev.data.global.x, ev.data.global.y);

        this.x = currentPoint.x;
        this.y = currentPoint.y;
        FloorPlan.Instance.redrawWalls();
        
    }

    private onMouseUp() {
        this.dragging = false;
    }

}