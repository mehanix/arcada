import { Graphics, InteractionEvent, Point } from "pixi.js";
import { INTERIOR_WALL_THICKNESS, Tool, WALL_THICKNESS } from "../../constants";
import { useStore } from "../../../../stores/EditorStore";
import { AddWallManager } from "../../actions/AddWallManager";
import { DeleteWallNodeAction } from "../../actions/DeleteWallNodeAction";
import { INodeSerializable } from "../../persistence/INodeSerializable";
import { FloorPlan } from "../FloorPlan";
import { viewportX, viewportY } from "../../../../helpers/ViewportCoordinates";
import { isMobile } from "react-device-detect";
export class WallNode extends Graphics {

    private dragging: boolean;
    private id: number;

    constructor(x: number, y: number, nodeId: number) {
        super();
        this.interactive = true;
        this.id = nodeId;

        //  this.drawCircle(0,0,INTERIOR_WALL_THICKNESS / 2)
        if(isMobile) {
            this.setSize(INTERIOR_WALL_THICKNESS*2);

        } else {
            this.setSize(INTERIOR_WALL_THICKNESS);

        }

        this.position.set(x, y)
        this.endFill();
        this.zIndex = 999;
        this.on("pointerdown", this.onMouseDown)
        this.on("pointermove", this.onMouseMove)
        this.on("pointerup", this.onMouseUp);
        this.on("pointerupoutside", this.onMouseUp);


    }

    public getId() {
        return this.id;
    }

    public setSize(size: number) {
        this.clear();
        this.beginFill(0x222222);
        this.drawRect(0, 0, size, size)
        this.pivot.set(size / 2, size / 2)

    }
    private onMouseDown(ev: InteractionEvent) {
        ev.stopPropagation();
        switch (useStore.getState().activeTool) {
            case Tool.Edit:
                this.dragging = true;
                break;
            case Tool.Remove:
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
        let currentPoint = {x:ev.data.global.x, y:ev.data.global.y};

        this.x = viewportX(currentPoint.x)
        this.y = viewportY(currentPoint.y);

        FloorPlan.Instance.redrawWalls();
    }

    public setPosition(x, y) {
        this.x = viewportX(x);
        this.y = viewportY(y)
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