import { PluginManager } from "pixi-viewport";
import { Graphics, Point, Rectangle, Sprite, Texture } from "pixi.js";
import { Modes, Coord } from "../constants";
import { Main } from "../../../scenes/Main";
import { Handle, HandleType } from "./Handle";

export class Transformable extends Sprite {
    
    private border:Graphics;
    private borderOffset:number;
    private mouseDown: boolean;
    private mode: Modes;
    private data: any;
    private viewportPluginManager: PluginManager;
    private points: Point[];
    private handles: Graphics[];
    bounds: Rectangle;

    public static dragging:boolean = false;
    constructor(texture: Texture, width: number, height:number) {
        super(texture);
        this.width = width;
        this.height = height;
        this.viewportPluginManager = Main.viewportPluginManager;
        this.mode = 0; // 0 idle 1 move 2 edit
        this.mouseDown = false;
        this.bounds = this.getLocalBounds();

        this.points = [];
        this.handles = [];
        for (let i=0;i<4; i++) {
            this.points[i] = new Point();
        }
        this.computePoints(); 

        this.border = new Graphics();
        this.borderOffset = 2;
        this.addChild(this.border);
        // this.drawEditControls();

        console.log(this.scale.x, this.scale.y, this.width, this.height)

        this.on('mousedown', this.onMouseDown)
        this.on('mousemove', this.onMouseMove)
        this.on('mouseup', this.onMouseUp)

    }

    private computePoints() {

        // [this.points[Coord.NE].x, this.points[Coord.NE].y] = [this.bounds.width, 0];
        // [this.points[Coord.E].x, this.points[Coord.E].y] = [this.bounds.width, this.bounds.height / 2];
        // [this.points[Coord.SE].x, this.points[Coord.SE].y] = [this.bounds.width, this.bounds.height];
        // [this.points[Coord.S].x, this.points[Coord.S].y] = [this.bounds.width / 2, this.bounds.height];
        // console.log(this.points)

    }

    private addHandle(type: HandleType, pos: Point) {
        let handle = new Handle({type: type, target: this, pos: pos});
        this.addChild(handle);
        this.handles.push(handle);
    }

    private drawEditControls(){
        console.log("rect",this.getLocalBounds());
        this.border.clear();
        this.border
        .lineStyle(3, 0,1,0,true)
        .drawRect(-this.borderOffset, -this.borderOffset,this.bounds.width + 2*this.borderOffset, this.bounds.height+ 2*this.borderOffset)

        this.addHandle(HandleType.Rotate, this.points[Coord.NE]); 
        this.addHandle(HandleType.Horizontal, this.points[Coord.E]); 
        this.addHandle(HandleType.FreeTransform, this.points[Coord.SE]); 
        this.addHandle(HandleType.Vertical, this.points[Coord.S]); 

    }

    private clearEditControls() {
        this.border.visible = false;
        
    }

    private onMouseDown(e:any) {

        console.log("transf")
        this.data = e.data;
        this.mouseDown = true;

        // let position = this.data.getLocalPosition(this);
        // this.pivot.set(position.x, position.y);
        // this.position.set(this.data.global.x, this.data.global.y); // todo: mate to fix the flicker.

        // if (e.data.originalEvent.button == 1) {
        //     const floorPlan = FloorPlan.Instance;
        //     floorPlan.removeFurniture(this.id);
        // }
    }

    private onMouseMove() {
        if (this.mouseDown) {

            switch (this.mode) {
                case Modes.Idle: {

                    this.mode = Modes.Dragging;
                    this.viewportPluginManager.pause('drag');
                    break;
                }
                case Modes.Dragging: {
                    // let newPosition = this.data.getLocalPosition(this.parent);
                    // this.x = newPosition.x;
                    // this.y = newPosition.y;
                    break;
                }
                case Modes.Editing: {

                    break;
                }
            }
        }
    }

    private onMouseUp() {
        this.mouseDown = false;
        this.viewportPluginManager.resume('drag');

        switch (this.mode) {
            case Modes.Idle: {
                this.mode = Modes.Editing;
                this.drawEditControls();
                break;
            }
            case Modes.Dragging: {

                this.mode = Modes.Idle;
                console.log(this.position);
                break;
            }
            case Modes.Editing: {
                this.mode = Modes.Idle;
                this.clearEditControls();
                break;
            }
        }
        console.log(this.mode)
    }

    /* Intelligently sets pivot and prevents jumping of sprite on the scene */
    public setSmartPivot(x:number, y?:number){
        if (y === undefined) {
            y = x;
        }
        console.log(this.data)
        // let currentPos = this.data.getLocalPosition(this);
        this.pivot.set(x,y);
        // let tempPos = this.getGlobalPosition();
        // let offset = new Point (currentPos.x - tempPos.x, currentPos.y - tempPos.y);
        // let newPos = new Point(tempPos.x + offset.x, tempPos.y + offset.y)
        // console.log(currentPos,tempPos,newPos, offset   )

        // this.position.set(newPos.x, newPos.y);
        // this.position.set(this.data.global.x, this.data.global.y)
    }

    public update() {
        // keeps border and handles i nscale. redraws them
        // handles
        let handleScaleX  = 1 / this.scale.x;
        let handleScaleY = 1 / this.scale.y;
        console.log("initial", this.scale)
        for (let handle of this.handles) {
            handle.scale.x = handleScaleX;
            handle.scale.y = handleScaleY;
        }

        // border
        this.border.clear();
        this.border
        .lineStyle(3, 0,1,0,true)
        .drawRect(-this.borderOffset, -this.borderOffset,this.bounds.width + 2*this.borderOffset, this.bounds.height+ 2*this.borderOffset)

    }


}