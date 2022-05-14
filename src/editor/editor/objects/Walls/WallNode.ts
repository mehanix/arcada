import { Graphics, InteractionEvent, Point } from "pixi.js";
import { Tool, WALL_THICKNESS } from "../../constants";
import { useStore } from "../../../../stores/ToolStore";
import { AddWallManager } from "../../actions/AddWallManager";
import { DeleteWallNodeAction } from "../../actions/DeleteWallNodeAction";
import { INodeSerializable } from "../../persistence/INodeSerializable";
import { FloorPlan } from "../FloorPlan";
import { viewportX, viewportY } from "../../../../helpers/ViewportCoordinates";
export class WallNode extends Graphics {

    private dragging:boolean;
    private id:number;

    constructor(x:number, y: number, nodeId:number) {
        super();
        this.interactive = true;
        this.id = nodeId;

        this.beginFill(0x000000);
        // this.drawCircle(0,0,WALL_THICKNESS/2)
        this.drawRect(0,0,WALL_THICKNESS,WALL_THICKNESS)
        this.pivot.set(WALL_THICKNESS/2, WALL_THICKNESS/2);
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
                let action = new DeleteWallNodeAction(this.id);
                action.execute();
                break;
            case Tool.WallAdd:
                AddWallManager.Instance.step(this);
                break;
        }
    
    }
    private onMouseMove(ev: InteractionEvent) {
        if (!this.dragging) {
            return;
        }
        let currentPoint = new Point(ev.data.global.x, ev.data.global.y);

        this.x = viewportX(currentPoint.x - currentPoint.x%10)
        this.y = viewportY(currentPoint.y - currentPoint.y%10);
        
        FloorPlan.Instance.redrawWalls();
    }

    private onMouseUp() {
        this.dragging = false;
    }

    public serialize() {
        let res: INodeSerializable;
        res = {
            id: this.id,
            x: this.x,
            y: this.y
        }
        return res;
    }

}