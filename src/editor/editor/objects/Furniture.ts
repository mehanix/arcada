import { Graphics, InteractionEvent, Sprite, Texture } from "pixi.js";
import { endpoint } from "../../../api/api-client";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { useStore } from "../../../stores/ToolStore";
import { DeleteFurnitureAction } from "../actions/DeleteFurnitureAction";
import { EditFurnitureAction } from "../actions/EditFurnitureAction";
import { INTERIOR_WALL_THICKNESS, METER, Tool } from "../constants";
import { IFurnitureSerializable } from "../persistence/IFurnitureSerializable";
import { TransformLayer } from "./TransformControls/TransformLayer";

export class Furniture extends Sprite {


    private id: number; // fiecare mobila isi stie index-ul in plan. uuids?
    // private dragging: boolean;
    public isAttached: boolean;
    public attachedToLeft: number;
    public attachedToRight: number;
    public xLocked: boolean;
    public resourcePath: string;
    private orientation: number;
    constructor(data: FurnitureData, id: number, attachedTo?: Graphics, attachedToLeft?: number, attachedToRight?: number) {

        let texture = Texture.from(`${endpoint}2d/${data.imagePath}`);
        super(texture);
        this.resourcePath = data.imagePath;
        console.log(this.resourcePath)
        this.id = id;
        this.orientation = 0;
        if (attachedTo) {
            this.isAttached = true;
            this.parent = attachedTo;
            this.attachedToLeft = attachedToLeft;
            this.attachedToRight = attachedToRight;
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

    private switchOrientation() {
        // 0 neutral flip orizontal 2 flip vertical 3 ambele
        switch (this.orientation) {
            case 0:
                this.anchor.x = 1;
                this.scale.x = -1*this.scale.x;
                this.anchor.y = 0;
                this.scale.y = 1*this.scale.y;
                this.orientation += 1;
                break;
            case 1:
                this.anchor.y = 1;
                this.scale.y = -1*this.scale.y;
                this.orientation += 1;
                if (this.resourcePath == "door") {
                    this.position.y -= (this.width - INTERIOR_WALL_THICKNESS);
                }
                break;
            case 2:
                this.anchor.x = 0;
                this.scale.x = -this.scale.x;
                this.orientation += 1;
                break;
            case 3:
                this.anchor.x = 0;
                this.scale.x = Math.abs(this.scale.x);
                this.anchor.y = 0;
                this.scale.y = Math.abs(this.scale.y);
                this.orientation = 0;
                if (this.resourcePath == "door") {
                    this.position.y += (this.width - INTERIOR_WALL_THICKNESS);
                }
                break;
        }
    }
    private onMouseDown(ev: InteractionEvent) {

        if (ev.data.button == 1) {
            ev.stopPropagation();
            this.switchOrientation();
            
            return;
        }
        switch (useStore.getState().activeTool) {
            case Tool.Edit: {
                const action = new EditFurnitureAction(this);
                action.execute();
                break;
            }

            case Tool.Remove: {
                const action = new DeleteFurnitureAction(this.id);
                action.execute();
                break;
            }

        }
    }

    private onMouseMove() { //todo update doar la mousedown=true
        TransformLayer.Instance.update();
    }

    public serialize() {
        let res: IFurnitureSerializable;
        res = {
            x: this.x,
            y: this.y,
            height: this.height / METER,
            width: this.width / METER,
            id: this.id,
            texturePath: this.resourcePath,
            rotation: this.rotation,
            attachedToLeft: this.attachedToLeft,
            attachedToRight: this.attachedToRight
        }


        return res;
    }
}