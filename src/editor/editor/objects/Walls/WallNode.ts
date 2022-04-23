import { Graphics, InteractionEvent, Point } from "pixi.js";
import { Tool } from "../../constants";
import { FloorPlan } from "../FloorPlan";
import { useStore } from "../../../../stores/ToolStore";
import { ActionManager } from "../../actions/ActionManager";

export class WallNode extends Graphics {

    private dragging:boolean;
    private id:number;

    constructor(x:number, y: number, nodeId:number) {
        super();
        this.interactive = true;
        this.id = nodeId;
        console.log(this.id)
        this.pivot.set(0.5);
        this.beginFill(Math.floor(Math.random()*16777215));
        this.drawCircle(0,0,10)
        this.position.set(x,y)
        this.endFill();
        this.zIndex = 999;
        this.on("mousedown", this.onMouseDown)
        this.on("mousemove", this.onMouseMove)
        this.on("mouseup",this.onMouseUp);
        this.on("mouseupoutside",this.onMouseUp);


    }

    public getId() {
        return this.id;
    }
  
    private onMouseDown(ev:InteractionEvent) {
        ev.stopPropagation();
        switch (useStore.getState().activeTool) {
            case Tool.WallEdit:
                this.dragging = true;
                break;
            case Tool.WallRemove:
                FloorPlan.Instance.removeWallNode(this.id);
                break;
            case Tool.WallAdd:
                ActionManager.Instance.step(this);
                break;
        }
    
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