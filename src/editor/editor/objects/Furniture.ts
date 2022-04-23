import { Point, Sprite, Texture } from "pixi.js";
import { useStore } from "../../../stores/ToolStore";
import { METER, Tool } from "../constants";
import { FloorPlan } from "./FloorPlan";
import { TransformLayer } from "./TransformControls/TransformLayer";
import { Wall } from "./Walls/Wall";

export class Furniture extends Sprite {


    private id: number; // fiecare mobila isi stie index-ul in plan. uuids?
    // private dragging: boolean;

    private transformLayer: TransformLayer;
    public stickyTarget:Wall;
    public stickyOrigin:Point;
    constructor(resourcePath: string, id: number, widthFactor:number, heightFactor:number, stickyTarget?:Wall, stickyOrigin?:Point) {

        let texture = Texture.from(resourcePath);
        super(texture);
        this.id = id;
        this.transformLayer = TransformLayer.Instance;
        
        if (stickyTarget) {
            this.stickyTarget = stickyTarget
            this.stickyOrigin = stickyOrigin
            console.log("sunt sticky!", stickyTarget.leftNode.getId(), stickyTarget.rightNode.getId())
        } else {
            this.stickyTarget = undefined
        }

        this.interactive = true;
        // this.dragging = false;
        this.width = widthFactor * METER;
        this.height = heightFactor * METER;
        console.log(resourcePath)

        this.on('mousedown', this.onMouseDown)
        this.on('mousemove', this.onMouseMove)
        // this.on('mouseup', this.onMouseUp)

    }

    public updatePos() {
        if (this.stickyOrigin == undefined) { //todo set dirty flag sa nu se faca mereu
            return
        }

        console.log(this.toLocal(this.stickyOrigin,this))



    }

    private onMouseDown() {

        switch (useStore.getState().activeTool) {
            case Tool.FurnitureEdit:
                this.transformLayer.select(this);
                break;

            case Tool.FurnitureRemove:
                FloorPlan.Instance.removeFurniture(this.id);
                break;
        }
    }

    private onMouseMove() {
        this.transformLayer.update();
        this.updatePos() //sticky
        
    }




}