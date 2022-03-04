import { PluginManager } from "pixi-viewport";
import { Sprite, Texture } from "pixi.js";
import { METER } from "../../constants";

enum Modes {
    Idle,
    Dragging,
    Editing
} 

export class Furniture extends Sprite {

    private mouseDown: boolean;
    private mode: Modes;

    private viewportPluginManager: PluginManager;
    // private dragging: boolean;

    constructor(resourcePath: string, pluginManager: PluginManager) {

        let texture = Texture.from(resourcePath);
        super(texture);

        this.viewportPluginManager = pluginManager;
        this.interactive = true;
        this.mode = 0; // 0 idle 1 move 2 edit
        // this.dragging = false;
        this.mouseDown = false;
        this.width = 2.6* METER;
        this.height = METER;

        this.on('mousedown', this.onMouseDown)
        this.on('mousemove', this.onMouseMove)
        this.on('mouseup', this.onMouseUp)



    }

    private onMouseDown() {

        this.mouseDown = true;
    }

    private onMouseMove(e: any) {
        if (this.mouseDown) {

            switch (this.mode) {
                case Modes.Idle: {

                    this.mode = Modes.Dragging;
                    this.viewportPluginManager.pause('drag');
                    break;
                }
                case Modes.Dragging: {
                    this.x += e.data.originalEvent.movementX;
                    this.y += e.data.originalEvent.movementY;
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