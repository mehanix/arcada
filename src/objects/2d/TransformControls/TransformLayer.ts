import { Container, Graphics, Point, Sprite } from "pixi.js";
import { Coord, Tool } from "../../../constants";
import { ToolManager } from "../../../Tools/ToolManager";
import { Handle, HandleType } from "./Handle";

// handles moving, resizing and rotating of objects.
// can only work if its state is active.
export class TransformLayer extends Container {
    private target: Sprite;
    private points: Point[];
    private handles: Handle[];
    private border:Graphics;
    private borderOffset:number;
    public static dragging:boolean;
    private static instance: TransformLayer;

    // private dragging:boolean;
    // private dragStartCoord:Point;
    private constructor() {
        super();
        this.points = [];
        this.handles = [];

        this.visible = false;
        this.target = null;
        this.border = new Graphics();
        this.borderOffset = 2;
        // this.dragging = false;


        this.addChild(this.border);

        // handles
        this.addHandle(HandleType.Rotate); 
        this.addHandle(HandleType.Horizontal); 
        this.addHandle(HandleType.FreeTransform); 
        this.addHandle(HandleType.Vertical);
        this.addHandle(HandleType.Move);       

     
        for (let i=0;i<5; i++) {
            this.points[i] = new Point();
        }

        this.on("mousedown",this.onMouseDown)
    }

    private onMouseDown() {
    }

    public static get Instance()
    {
        return this.instance || (this.instance = new this()); // TODO obfuscate
    }

    private computePoints() {
        let x = this.target.position.x;
        let y = this.target.position.y;

        [this.points[Coord.NE].x, this.points[Coord.NE].y] = [x + this.target.width, y];
        [this.points[Coord.E].x, this.points[Coord.E].y] = [x + this.target.width, y + (this.target.height / 2)];
        [this.points[Coord.SE].x, this.points[Coord.SE].y] = [x + this.target.width, y + this.target.height];
        [this.points[Coord.S].x, this.points[Coord.S].y] = [x + (this.target.width / 2), y +this.target.height];
        [this.points[Coord.C].x, this.points[Coord.C].y] = [x + (this.target.width / 2), y +(this.target.height / 2)];


    }
    private addHandle(type: HandleType) {
        let handle = new Handle({type: type, target: null, pos: new Point(0,0)});
        this.addChild(handle);
        this.handles.push(handle);
    }

    public select(t:Sprite) {
        if (ToolManager.Instance.getTool() != Tool.FurnitureEdit) {
            return;
        }
        if (this.target != null) {
            this.deselect();
            return;
        }
        console.log("t")
        this.target = t;
        this.visible = true;
        this.interactive = true;

        this.computePoints();
        this.set();
    }

    private set() {
        
       this.drawBorder();

        for (let i = 0; i < this.handles.length; i++) { 
            console.log(this.points[i])
            this.handles[i].setTarget(this.target)

            this.handles[i].update(this.points[i])
        }
        
    }

    private drawBorder() {
        this.border.clear();
        const x = this.target.position.x - this.borderOffset;
        const y = this.target.position.y - this.borderOffset;
        const w = this.points[Coord.SE].x - x + 2*this.borderOffset;
        const h = this.points[Coord.SE].y - y + 2*this.borderOffset;
        this.border
        .lineStyle(3, 0,1,0,true)
        .drawRect(x,y,w,h)

    }
    
    public deselect() {
        this.target = null;
        this.visible = false;
        this.interactive = false;
    }

    public update() {
        if (!this.target)
            return;

        this.computePoints();
        this.drawBorder();

        for (let i = 0; i < this.handles.length; i++) { 
            this.handles[i].update(this.points[i])
        }
    }
}