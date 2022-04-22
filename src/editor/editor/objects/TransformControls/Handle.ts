import {Graphics, InteractionEvent, Point, Sprite } from "pixi.js";
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
    private mouseStartPoint: Point;
    private offset: Point;
    private startRotaton: number;
    private startScale:Point;
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
        this.mouseStartPoint = new Point(ev.data.global.x, ev.data.global.y); // unde se afla target la mousedown
        console.log("badabum")
        this.startRotaton = this.target.rotation;
        this.startScale = new Point(this.target.scale.x, this.target.scale.y)
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
        let mouseEndPoint = new Point(ev.data.global.x, ev.data.global.y); // unde i mouseul acum
        let startDistance = this.getDistance(this.mouseStartPoint, this.target.position)
        let endDistance = this.getDistance(mouseEndPoint, this.target.position);
        let sizeFactor = endDistance / startDistance;
        // console.log(this.mouseStartPoint, currentPoint, distance, this.type)
        switch (this.type) {
            case HandleType.Rotate:
                let relativeStart = new Point(this.mouseStartPoint.x - this.target.x, this.mouseStartPoint.y - this.target.y)
                let relativeEnd = new Point( mouseEndPoint.x - this.target.x, mouseEndPoint.y - this.target.y)

                let endAngle = Math.atan2(relativeEnd.y, relativeEnd.x);
                let startAngle = Math.atan2(relativeStart.y, relativeStart.x)
                let deltaAngle = endAngle - startAngle;
                this.target.rotation = this.startRotaton + deltaAngle;
                
                break;
            case HandleType.Horizontal:
                this.target.scale.x = this.startScale.x * sizeFactor;
                break;
            case HandleType.Vertical:
                this.target.scale.y = this.startScale.y * sizeFactor;
                break;
            case HandleType.FreeTransform:
                this.target.scale.x = this.startScale.x * sizeFactor;
                this.target.scale.y = this.startScale.y * sizeFactor;
                break;
            case HandleType.Move:
                // distanta dintre mouse si punct start
                // let deltaX = currentPoint.x - this.mouseStartPoint.x;
                // let deltaY = currentPoint.y - this.mouseStartPoint.y;
                console.log(this.mouseStartPoint.x, this.mouseStartPoint.y, mouseEndPoint.x, mouseEndPoint.y)

                // distanta dintre punct start si colt stanga sus
                this.target.x = mouseEndPoint.x - this.offset.x
                this.target.y = mouseEndPoint.y - this.offset.y
                break;
        }
    }

    private getDistance(src:Point, dest:Point) {
       return Math.sqrt(Math.pow(dest.x - src.x, 2) + Math.pow(dest.y - src.y, 2));
    }

    public setTarget(target:Sprite) {
        this.target = target;
    }

    /* sets scale and transform */
    public update(pos:Point) {
        console.log("updating...")
        this.position.set(pos.x, pos.y)
        this.offset.x = pos.x - this.target.x;
        this.offset.y = pos.y - this.target.y;
    }
}