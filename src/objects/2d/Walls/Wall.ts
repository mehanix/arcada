import { Graphics, Point } from "pixi.js";
import { WALL_THICKNESS } from "../constants";

export interface IAnchor {
    other:Wall;
    otherPoint:Point; // local points
    myPoint:Point;
}

export class Wall extends Graphics {
    
    leftNode: number;
    rightNode: number;
    timestamp:number;
    constructor(x1:number, y1: number, x2:number, y2:number, leftNode:number, rightNode:number) {
        super();
        this.timestamp = Date.now();
        // console.log("created", leftNode, rightNode, this.timestamp)

        this.interactive = true;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.pivot.set(8);

        this.drawLine(x1,y1,x2,y2);
        this.on("mousedown", this.mousedown)
        // this.on("mousemove", this.onMouseMove)
        // this.on("mouseup",this.onMouseUp);
        // this.on("mouseupoutside",this.onMouseUp);


    }

    private drawLine(x1:number, y1: number, x2:number, y2:number) {
        this.clear();
        this.lineStyle(1,0x1a1a1a);

        if (x1 > x2) {
            let aux;
            aux = x1
            x1 = x2;
            x2 = aux;
            aux = y1;
            y1 = y2;
            y2 = aux
            
        }

        let radians = Math.atan((y2-y1)/(x2-x1)); // aflu unghiul sa pot roti
        let length = Math.hypot(x1-x2, y1-y2);
        console.log("angle", radians, Object.is(radians, -0))
        this.beginFill().drawRect(0,0,length,WALL_THICKNESS).endFill()
         this.position.set(x1,y1)
        // console.log("hit",this.hitArea)
        if (Object.is(radians, -0)) {
            this.angle = 180;
        } else {
            this.angle = radians * 57.29577
        }
        

    }

    private mousedown() {
        console.log("hi!", this.leftNode, this.rightNode, this.timestamp)
    }
  
}