import { Graphics, InteractionEvent, Point, Sprite } from "pixi.js";
import { TransformLayer } from "./TransformLayer";

export enum HandleType {
    Horizontal,
    Vertical,
    FreeTransform,
    Rotate,
    Move
}

export interface IHandleConfig {
    size?: number,
    color?: number,
    type: HandleType,
    target: Sprite,
    pos?: Point
}

export class Handle extends Graphics {


    private type: HandleType;
    private target: Sprite;
    private color: number = 0x000;
    private size: number = 7;
    
    private active: boolean = false;
    private startPoint: Point;
    private startDimensions: Point;
    private offset: Point;
    constructor(handleConfig: IHandleConfig) {
        super();
        this.interactive = true;
        this.offset = new Point();
        if (handleConfig.color) {
            this.color = handleConfig.color;
        }

        if (handleConfig.size) {
            this.size = handleConfig.size;

        }

        this.type = handleConfig.type;
        this.target = handleConfig.target;


        this.beginFill(this.color)
            .lineStyle(1, this.color)
            .drawRect(0, 0, this.size, this.size).endFill();

        this.pivot.set(0.5);
        if (handleConfig.pos) {
            this.position.set(handleConfig.pos.x, handleConfig.pos.y);
        }

        this.on("mousedown", this.onMouseDown)
        this.on("mouseup", this.onMouseUp)
        this.on("mouseupoutside", this.onMouseUp)
        this.on("mousemove", this.onMouseMove)
    }

    private onMouseDown(ev: InteractionEvent) {
        if (TransformLayer.dragging) {
            return;
        }
        this.startPoint = this.getGlobalPosition();
        console.log("badabum")
        this.startDimensions = new Point(this.target.width, this.target.height);
        TransformLayer.dragging = true;
        this.active = true;
        // this.target.setSmartPivot(0);
        ev.stopPropagation();
    }

    private onMouseUp(ev: InteractionEvent) {
        console.log("hei hei")
        TransformLayer.dragging = false;
        this.active = false;
        ev.stopPropagation();
    }


    private onMouseMove(ev: InteractionEvent) {

        // update scale 

        if (!this.active || !TransformLayer.dragging) {
            return;
        }
        let currentPoint = new Point(ev.data.global.x, ev.data.global.y);
        let distance = this.getDistance(this.startPoint, currentPoint)
        // console.log(this.startPoint, currentPoint, distance, this.type)
        switch (this.type) {
            case HandleType.Horizontal:
                this.target.width= this.startDimensions.x + distance.x;
                break;
            case HandleType.Vertical:
                this.target.height= this.startDimensions.y + distance.y;
                break;
            case HandleType.FreeTransform:
                this.target.width= this.startDimensions.x + distance.x;
                this.target.height= this.startDimensions.y + distance.y;
                break;
            case HandleType.Move:
                // distanta dintre mouse si punct start
                // let deltaX = currentPoint.x - this.startPoint.x;
                // let deltaY = currentPoint.y - this.startPoint.y;
                console.log(this.startPoint.x, this.startPoint.y, currentPoint.x, currentPoint.y)

                // distanta dintre punct start si colt stanga sus
                this.target.x = currentPoint.x - this.offset.x
                this.target.y = currentPoint.y - this.offset.y
                break;
        }

        // this.target.update();


    }

    private getDistance(src:Point, dest:Point) {
        // let ans = Math.sqrt(Math.pow(dest.x - src.x, 2) + Math.pow(dest.y - src.y, 2));
        // if (dest.x < src.x)
        //     ans = -ans;

        let x = dest.x - src.x;
        let y = dest.y - src.y;
        return new Point(x,y);
    }

    public setTarget(target:Sprite) {
        this.target = target;
    }

    /* sets scale and transform */
    public update(pos:Point) {
        this.position.set(pos.x, pos.y)
        this.offset.x = pos.x - this.target.x;
        this.offset.y = pos.y - this.target.y;
    }
}