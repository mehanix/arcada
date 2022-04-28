import { Sprite, Texture } from "pixi.js";
import { endpoint } from "../../../api/api-client";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { useStore } from "../../../stores/ToolStore";
import { METER, Tool } from "../constants";
import { FloorPlan } from "./FloorPlan";
import { TransformLayer } from "./TransformControls/TransformLayer";
import { Wall } from "./Walls/Wall";

export class Furniture extends Sprite {


    private id: number; // fiecare mobila isi stie index-ul in plan. uuids?
    // private dragging: boolean;
    public isAttached:boolean;
    public attachedToLeft:number;
    public attachedToRight:number;
    public xLocked:boolean;
    private transformLayer: TransformLayer;
    public resourcePath: string;
    constructor(data:FurnitureData, id:number, attachedTo?:Wall) {

        let texture = Texture.from(`${endpoint}2d/${data.imagePath}`);
        super(texture);
        this.resourcePath = data.imagePath;
        this.id = id;
        this.transformLayer = TransformLayer.Instance;
        
        if (attachedTo) {
            this.isAttached = true;
            this.parent = attachedTo;
            this.attachedToLeft = attachedTo.leftNode.getId();
            this.attachedToRight = attachedTo.rightNode.getId();
            this.xLocked = true;
        } else {
            this.xLocked = false;
            this.isAttached = false;
        }
        this.interactive = true;
        // this.dragging = false;
        this.width = data.width * METER;
        this.height = data.height * METER;

        this.on('mousedown', this.onMouseDown)
        this.on('mousemove', this.onMouseMove)

    }

    public getId() {
        return this.id;
    }
    private onMouseDown() {

        console.log("click!!")
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
    }
}