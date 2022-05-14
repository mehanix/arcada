import {Graphics, InteractionEvent, Point } from "pixi.js";
import { viewportX, viewportY } from "../../../../helpers/ViewportCoordinates";
import { Furniture } from "../Furniture";
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
    target: Furniture,
    pos?: Point
}

export class Handle extends Graphics {

    private type: HandleType;
    private target: Furniture;
    private color: number = 0x000;
    private size: number = 7;
    
    private active: boolean = false;
    private mouseStartPoint: Point;
    private targetStartPoint: Point;
    private startRotaton: number;
    private startScale:Point;
    constructor(handleConfig: IHandleConfig) {
        super();
        this.interactive = true;
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
        this.targetStartPoint = this.target.getGlobalPosition();
        this.startRotaton = this.target.rotation;
        this.startScale = new Point(this.target.scale.x, this.target.scale.y)
        TransformLayer.dragging = true;
        this.active = true;
        // this.target.setSmartPivot(0);
        ev.stopPropagation();
    }

    private onMouseUp(ev: InteractionEvent) {
        TransformLayer.dragging = false;
        this.active = false;
        ev.stopPropagation();
    }


    private onMouseMove(ev: InteractionEvent) {

        // update scale 
        let globalPos = this.target.getGlobalPosition();
        if (!this.active || !TransformLayer.dragging) {
            return;
        }
        let mouseEndPoint = new Point(ev.data.global.x, ev.data.global.y); // unde i mouseul acum
        let startDistance = this.getDistance(this.mouseStartPoint, globalPos)
        let endDistance = this.getDistance(mouseEndPoint, globalPos);
        let sizeFactor = endDistance / startDistance;
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

                // move delta: distanta intre click original si move
                let delta = new Point(this.mouseStartPoint.x - mouseEndPoint.x, this.mouseStartPoint.y - mouseEndPoint.y)
                this.target.position.x = viewportX(this.targetStartPoint.x - delta.x);
                if (!this.target.xLocked) {
                    this.target.position.y = viewportY(this.targetStartPoint.y - delta.y);
                }


                // // distanta dintre punct start si colt stanga sus
                // let mpl = this.toLocal(mouseEndPoint, this.target);
                // this.target.x = mpl.x - this.target.width / 2
                // this.target.y = mpl.y - this.target.height / 2
                break;
        }
    }

    private getDistance(src:Point, dest:Point) {
       return Math.sqrt(Math.pow(dest.x - src.x, 2) + Math.pow(dest.y - src.y, 2));
    }

    public setTarget(target:Furniture) {
        this.target = target;
    }

    /* sets scale and transform */
    public update(pos:Point) {
        this.position.set(pos.x, pos.y)
    }
}