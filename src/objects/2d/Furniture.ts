import { PluginManager } from "pixi-viewport";
import { Sprite, Texture } from "pixi.js";
import { METER } from "../../constants";
import { FloorPlan } from "../../FloorPlan";
import { Main } from "../../scenes/Main";

enum Modes {
    Idle,
    Dragging,
    Editing
} 

export class Furniture extends Sprite {

    private mouseDown: boolean;
    private mode: Modes;
    private data: any;
    private viewportPluginManager: PluginManager;
    private id:number; // fiecare mobila isi stie index-ul in plan. uuids?
    // private dragging: boolean;

    constructor(resourcePath: string, id:number) {

        let texture = Texture.from(resourcePath);
        super(texture);

        this.viewportPluginManager = Main.viewportPluginManager;
        this.interactive = true;
        this.mode = 0; // 0 idle 1 move 2 edit
        // this.dragging = false;
        this.mouseDown = false;
        this.width = 2.6* METER;
        this.height = METER;
        this.id = id;

        this.on('mousedown', this.onMouseDown)
        this.on('mousemove', this.onMouseMove)
        this.on('mouseup', this.onMouseUp)

        

    }

    private onMouseDown(e:any) {

        this.data = e.data;
        this.mouseDown = true;

        let position = this.data.getLocalPosition(this);
        this.pivot.set(position.x, position.y);
        this.position.set(this.data.global.x, this.data.global.y); // todo: mate to fix the flicker.

        if (e.data.originalEvent.button == 1) {
            const floorPlan = FloorPlan.Instance;
            floorPlan.removeFurniture(this.id);
        }
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
                    let newPosition = this.data.getLocalPosition(this.parent);
                    this.x = newPosition.x;
                    this.y = newPosition.y;
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
                break;
            }
            case Modes.Dragging: {

                this.mode = Modes.Idle;
                console.log(this.position);
                break;
            }
            case Modes.Editing: {
                this.mode = Modes.Idle;
                break;
            }
        }
        console.log(this.mode)
    }

}