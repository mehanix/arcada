import { Container, Graphics, Point } from "pixi.js";

export interface IAnchor {
    other:Wall;
    otherPoint:Point; // local points
    myPoint:Point;
}

export class Wall extends Container {
    
    wallGraphics: Graphics;
    constructor(x:number, y: number, w:number, h:number, vertical:boolean=false, anchors:IAnchor[]=[]) {
        super();
        this.wallGraphics = new Graphics();
        this.interactive = true;
        this.pivot.set(0);
        this.wallGraphics.beginFill(Math.floor(Math.random()*16777215));
        this.wallGraphics.drawRect(0, 0, w, h)
        this.position.set(x,y)
        this.wallGraphics.endFill();
        if (vertical) {
            this.angle = 90;
        }
        this.addChild(this.wallGraphics);
        console.log(anchors)

        this.on("mousedown", this.mousedown)
        // this.on("mousemove", this.onMouseMove)
        // this.on("mouseup",this.onMouseUp);
        // this.on("mouseupoutside",this.onMouseUp);


    }

    private mousedown() {
        console.log("hi!")
    }
  
}