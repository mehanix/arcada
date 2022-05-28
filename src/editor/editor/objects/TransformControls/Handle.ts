import {Graphics, InteractionEvent, Point } from "pixi.js";
import { viewportX, viewportY } from "../../../../helpers/ViewportCoordinates";
import { Furniture } from "../Furniture";
import { TransformLayer } from "./TransformLayer";

export enum HandleType {
    Horizontal,
    Vertical,
    HorizontalVertical,
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
    targetStartCenterPoint: Point;
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
        this.buttonMode = true;
        this.beginFill(this.color)
            .lineStyle(1, this.color)

        if (this.type == HandleType.Rotate) {
            this.drawCircle(0, 0, this.size/1.5).endFill();
            this.pivot.set(this.size/3, this.size/3);

        } else {
            this.drawRect(0, 0, this.size, this.size).endFill();
            this.pivot.set(0.5);
        }


        switch (this.type) {
            case HandleType.Move:
                this.cursor = "move";
                break; 
            case HandleType.Horizontal:
                this.cursor = "ew-resize";
                break;
            case HandleType.Vertical:
                this.cursor = "ns-resize";
                break;
            case HandleType.HorizontalVertical:
                this.cursor = "nwse-resize";
                break;
            case HandleType.Rotate:
                this.cursor = "wait";
                break;
        }
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
        this.targetStartCenterPoint = new Point( this.targetStartPoint.x + this.target.width / 2, this. targetStartPoint.y  + this.target.height / 2)
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

        if (!this.active || !TransformLayer.dragging) {
            return;
        }
        // unde se afla mouse-ul acum
        let mouseEndPoint = new Point(ev.data.global.x, ev.data.global.y); 
        // distanta de la obiect la punctul de start (unde a dat click utilizatorul)
        let startDistance = this.getDistance(this.mouseStartPoint, this.targetStartCenterPoint)
        // distanta de la obiect la pozitia noua a mouse-ului
        let endDistance = this.getDistance(mouseEndPoint, this.targetStartCenterPoint);
        // raportul dintre cele doua distante:  
        // raport > 1 -> se mareste obiectul
        // raport < 1 -> se micsoreaza obiectul
        let sizeFactor = endDistance / startDistance;
        console.log(startDistance, endDistance, sizeFactor)
        switch (this.type) {
            case HandleType.Rotate:
                
                let relativeStart = new Point(this.mouseStartPoint.x - this.targetStartPoint.x, this.mouseStartPoint.y - this.targetStartPoint.y)
                let relativeEnd = new Point( mouseEndPoint.x - this.targetStartPoint.x, mouseEndPoint.y - this.targetStartPoint.y)

                let endAngle = Math.atan2(relativeEnd.y, relativeEnd.x);
                let startAngle = Math.atan2(relativeStart.y, relativeStart.x)
                let deltaAngle = endAngle - startAngle;
                
                let r = Math.sqrt(this.target.width*this.target.width + this.target.height*this.target.height)/2
                this.target.rotation = this.startRotaton + deltaAngle;
                
                let sin = Math.sin(deltaAngle);
                let cos = 1 - Math.cos(deltaAngle);
                this.target.x = this.targetStartPoint.x - cos*r
                this.target.y =  this.targetStartPoint.y + sin*r 

                break;
            case HandleType.Horizontal:
                this.target.scale.x = this.startScale.x * sizeFactor;
                break;
            case HandleType.Vertical:
                this.target.scale.y = this.startScale.y * sizeFactor;
                break;
            case HandleType.HorizontalVertical:
                this.target.scale.x = this.startScale.x * sizeFactor;
                this.target.scale.y = this.startScale.y * sizeFactor;
                break;
            case HandleType.Move:
                // move delta: distanta intre click original si click in urma mutarii
                let delta = new Point( mouseEndPoint.x - this.mouseStartPoint.x, mouseEndPoint.y - this.mouseStartPoint.y)
                this.target.position.x = viewportX(this.targetStartPoint.x + delta.x);
                if (!this.target.xLocked) {
                    this.target.position.y = viewportY(this.targetStartPoint.y + delta.y);
                }
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